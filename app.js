const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const morgan = require('morgan');
const swaggerStats = require('swagger-stats');
const SwaggerParser = require('swagger-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const { createLogger, format, transports } = require('winston');
const { createIndices, indexLog, indexStat, indexError } = require('./config/elasticsearch');

// Import des routes
const routes = require('./routes');

// Configuration du logger Winston
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Suivi Rénal',
      version: '1.0.0',
      description: 'API pour le suivi des patients rénaux',
      contact: {
        name: 'Support API',
        email: 'support@suivirenal.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Serveur de production' : 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Token invalide ou manquant',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Non autorisé'
                  }
                }
              }
            }
          }
        },
        BadRequest: {
          description: 'Requête invalide',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Données invalides'
                  }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Utilisateurs',
        description: 'Gestion des utilisateurs'
      },
      {
        name: 'Administrateurs',
        description: 'Gestion des administrateurs'
      },
      {
        name: 'Médecins',
        description: 'Gestion des médecins'
      },
      {
        name: 'Infirmiers',
        description: 'Gestion des infirmiers'
      },
      {
        name: 'Patients',
        description: 'Gestion des patients'
      }
    ]
  },
  apis: ['./routes/*.js', './swaggerModels.js', './swaggerControllers.js', './swaggerSecurity.js', './swaggerDtos.js', './swaggerMiddlewares.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configuration de la sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Configuration du rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard'
});
app.use('/api/', limiter);

// Middleware de compression
app.use(compression());

// Middleware pour parser les cookies
app.use(cookieParser());

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialisation d'Elasticsearch
createIndices().catch(console.error);

// Middleware de logging avec morgan et Elasticsearch
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    write: async (message) => {
      logger.info(message.trim());
      await indexLog({
        message: message.trim(),
        level: 'info',
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status: parseInt(message.split(' ')[2]),
        responseTime: parseFloat(message.split(' ')[5])
      });
    }
  }
}));

// Middleware pour ajouter un ID unique à chaque requête
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

// Configuration de Swagger Stats
const swaggerStatsConfig = {
  name: 'Suivi Rénal API',
  version: '1.0.0',
  timelineBucketDuration: 60000,
  uriPath: '/swagger-stats',
  authentication: true,
  onAuthenticate: (req, username, password) => {
    return (username === process.env.SWAGGER_STATS_USERNAME && 
            password === process.env.SWAGGER_STATS_PASSWORD);
  },
  elasticsearch: process.env.ELASTICSEARCH_URL,
  elasticsearchIndexPrefix: 'swagger-stats',
  elasticsearchUsername: process.env.ELASTICSEARCH_USERNAME,
  elasticsearchPassword: process.env.ELASTICSEARCH_PASSWORD,
  durationBuckets: [50, 100, 200, 500, 1000, 5000],
  requestSizeBuckets: [500, 5000, 15000, 50000],
  responseSizeBuckets: [500, 5000, 15000, 50000],
  apdexThreshold: 50,
  onResponseFinish: async (req, res, rrr) => {
    logger.info(`Response finished: ${JSON.stringify(rrr)}`);
    await indexStat({
      endpoint: req.path,
      method: req.method,
      responseTime: rrr.duration,
      status: rrr.status,
      requestSize: rrr.requestLength,
      responseSize: rrr.responseLength
    });
  }
};

app.use(swaggerStats.getMiddleware(swaggerStatsConfig));

// Validation de la documentation Swagger
SwaggerParser.validate(swaggerDocs)
  .then(() => {
    logger.info('Documentation Swagger valide');
  })
  .catch(err => {
    logger.error('Erreur dans la documentation Swagger:', err);
  });

// Configuration de l'interface Swagger
const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none } .swagger-ui { max-width: 1200px; margin: 0 auto; }',
  customSiteTitle: "Documentation API Suivi Rénal",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    deepLinking: true,
    defaultModelsExpandDepth: 3,
    defaultModelExpandDepth: 3,
    docExpansion: 'list',
    tagsSorter: 'alpha',
    operationsSorter: 'alpha'
  }
};

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));
app.use('/api', routes);

// Middleware pour la gestion des erreurs avec Elasticsearch
app.use((err, req, res, next) => {
  logger.error(`[${req.id}] Erreur: ${err.message}`);
  logger.error(err.stack);
  
  indexError({
    requestId: req.id,
    error: err.message,
    stack: err.stack,
    endpoint: req.path,
    method: req.method
  }).catch(console.error);
  
  res.status(err.status || 500).json({
    error: 'Une erreur est survenue sur le serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    requestId: req.id
  });
});

// Middleware pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    requestId: req.id
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`\n=============================================`);
  logger.info(`🚀 Serveur démarré sur le port ${PORT}`);
  logger.info(`📚 Documentation Swagger disponible sur: http://localhost:${PORT}/api-docs`);
  logger.info(`🌐 Environnement: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`=============================================\n`);
});