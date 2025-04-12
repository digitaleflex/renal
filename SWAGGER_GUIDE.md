# Guide de Documentation Swagger

Ce guide explique comment la documentation Swagger a été implémentée dans l'application de suivi rénal.

## Structure de la Documentation

La documentation Swagger est divisée en plusieurs fichiers pour une meilleure organisation :

1. `swaggerModels.js` - Documentation des modèles de données
2. `swaggerControllers.js` - Documentation des contrôleurs
3. `swaggerSecurity.js` - Documentation de la sécurité et des middlewares
4. `swaggerDtos.js` - Documentation des DTOs de validation
5. `swaggerMiddlewares.js` - Documentation détaillée des middlewares

## Configuration de Base

La configuration Swagger est définie dans `app.js` :

```javascript
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
  apis: [
    './routes/*.js',
    './swaggerModels.js',
    './swaggerControllers.js',
    './swaggerSecurity.js',
    './swaggerDtos.js',
    './swaggerMiddlewares.js'
  ],
};
```

## Documentation des Routes

### Format de Base

```javascript
/**
 * @swagger
 * /api/endpoint:
 *   [get|post|put|delete]:
 *     summary: Description courte
 *     tags: [NomDuTag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: [path|query|body]
 *         name: nomParametre
 *         required: true
 *         schema:
 *           type: [string|number|boolean|object]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NomDuSchema'
 *     responses:
 *       200:
 *         description: Description de la réponse
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NomDuSchema'
 */
```

### Exemple Complet

```javascript
/**
 * @swagger
 * /api/admin/utilisateurs/{id}:
 *   get:
 *     summary: Récupère les informations d'un utilisateur spécifique
 *     tags: [Administrateur]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
```

## Documentation des Modèles

### Format de Base

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     NomDuModele:
 *       type: object
 *       required:
 *         - champ1
 *         - champ2
 *       properties:
 *         champ1:
 *           type: string
 *           description: Description du champ
 *           example: "Exemple de valeur"
 */
```

### Exemple Complet

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - email
 *       properties:
 *         nom:
 *           type: string
 *           description: Nom du patient
 *           example: "Dupont"
 *         prenom:
 *           type: string
 *           description: Prénom du patient
 *           example: "Jean"
 */
```

## Documentation des Middlewares

### Format de Base

```javascript
/**
 * @swagger
 * components:
 *   x-middlewares:
 *     nomMiddleware:
 *       description: Description du middleware
 *       parameters:
 *         - name: nomParametre
 *           in: [header|query|body]
 *           required: true
 *           schema:
 *             type: [string|number|boolean|object]
 *       responses:
 *         - $ref: '#/components/responses/NomDeLaReponse'
 */
```

## Bonnes Pratiques

1. **Organisation**
   - Utiliser des tags pour regrouper les routes par fonctionnalité
   - Documenter chaque endpoint de manière complète
   - Inclure des exemples pour chaque schéma

2. **Sécurité**
   - Toujours documenter les exigences de sécurité
   - Utiliser le schéma bearerAuth pour JWT
   - Documenter les rôles et permissions

3. **Validation**
   - Documenter les contraintes de validation
   - Inclure des exemples de réponses d'erreur
   - Décrire les formats attendus

4. **Réponses**
   - Documenter tous les codes de réponse possibles
   - Inclure des exemples de réponses
   - Décrire les schémas de réponse

## Ajout de Nouvelle Documentation

1. Identifier le type de documentation à ajouter (route, modèle, middleware, etc.)
2. Utiliser le format approprié
3. Ajouter la documentation dans le fichier correspondant
4. Mettre à jour le CHANGELOG.md
5. Tester la documentation via l'interface Swagger UI

## Vérification

Pour vérifier que la documentation est correcte :
1. Démarrer le serveur
2. Accéder à `http://localhost:5000/api-docs`
3. Vérifier que tous les endpoints sont documentés
4. Tester les exemples fournis
5. Vérifier les schémas et les réponses

## Résolution des Problèmes Courants

1. **Documentation non affichée**
   - Vérifier que le fichier est bien inclus dans `apis` de la configuration
   - Vérifier la syntaxe des commentaires Swagger
   - Vérifier que le serveur est en cours d'exécution

2. **Erreurs de validation**
   - Vérifier les types de données
   - Vérifier les champs requis
   - Vérifier les formats (email, date, etc.)

3. **Problèmes de sécurité**
   - Vérifier que le schéma bearerAuth est correctement configuré
   - Vérifier les rôles et permissions
   - Vérifier les tokens JWT

## Ressources Utiles

- [Documentation OpenAPI 3.0](https://swagger.io/specification/)
- [Guide Swagger pour Express](https://swagger.io/docs/specification/about/)
- [Exemples de Documentation Swagger](https://github.com/swagger-api/swagger-ui/tree/master/docs) 