const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const morgan = require('morgan');

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
    },
  },
  apis: ['./routes/*.js', './swaggerModels.js', './swaggerControllers.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

require("dotenv").config(); // Charge les variables d'environnement depuis .env

//Connect to database
connectDB();

//Middleware
app.use(express.json());
app.use(cors());

// Configuration des logs avec morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Message de Bienvenue au demarrage du fichier
app.get('/', (req, res) => {
    res.send("Bienvenue sur mon appli");
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