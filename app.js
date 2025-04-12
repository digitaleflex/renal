const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const morgan = require('morgan');
const swaggerStats = require('swagger-stats');
const SwaggerParser = require('swagger-parser');

const userRoutes = require('./routes/userRoutes');
const administratorRoutes = require('./routes/administratorRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const patientRoutes = require('./routes/patientRoutes');

// Import de la documentation des modèles
require('./swaggerModels');
require('./swaggerControllers');
require('./swaggerSecurity');
require('./swaggerDtos');
require('./swaggerMiddlewares');

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
        url: 'http://localhost:5000',
        description: 'Serveur de développement',
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

// Configuration de Swagger Stats
app.use(swaggerStats.getMiddleware({
  name: 'Suivi Rénal API',
  version: '1.0.0',
  timelineBucketDuration: 60000,
  uriPath: '/swagger-stats',
  authentication: true,
  onAuthenticate: function(req, username, password) {
    return (username === 'admin' && password === 'admin');
  }
}));

// Validation de la documentation Swagger
SwaggerParser.validate(swaggerDocs)
  .then(() => {
    console.log('Documentation Swagger valide');
  })
  .catch(err => {
    console.error('Erreur dans la documentation Swagger:', err);
  });

require("dotenv").config(); // Charge les variables d'environnement depuis .env

//Connect to database
connectDB();

//Middleware
app.use(express.json());
app.use(cors());

// Configuration des logs avec morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Configuration de l'interface Swagger avec thème personnalisé
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

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));

// Message de Bienvenue au demarrage du fichier
app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API Suivi Rénal");
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', administratorRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/nurse', nurseRoutes);
app.use('/api/patient', patientRoutes);

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Erreur: ${err.message}`);
    console.error(err.stack);
    res.status(500).json({
        error: 'Une erreur est survenue sur le serveur',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Port d'ecoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n=============================================`);
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📚 Documentation Swagger disponible sur: http://localhost:${PORT}/api-docs`);
    console.log(`🌐 Environnement: ${process.env.NODE_ENV || 'development'}`);
    console.log(`=============================================\n`);
});