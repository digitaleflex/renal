/**
 * @swagger
 * components:
 *   schemas:
 *     PatientActivationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indique si l'activation a réussi
 *           example: true
 *         message:
 *           type: string
 *           description: Message de confirmation
 *           example: "Compte activé avec succès"
 * 
 *     PatientCreationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indique si la création a réussi
 *           example: true
 *         message:
 *           type: string
 *           description: Message de confirmation
 *           example: "Patient créé avec succès"
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: objectId
 *               description: ID du patient créé
 *               example: "507f1f77bcf86cd799439011"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indique si l'opération a échoué
 *           example: false
 *         error:
 *           type: string
 *           description: Message d'erreur
 *           example: "Erreur lors de l'activation du compte"
 * 
 *     PatientActivationRequest:
 *       type: object
 *       required:
 *         - token
 *         - password
 *       properties:
 *         token:
 *           type: string
 *           description: Token d'activation
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         password:
 *           type: string
 *           description: Nouveau mot de passe
 *           example: "NouveauMotDePasse123!"
 * 
 *     PatientCreationRequest:
 *       type: object
 *       required:
 *         - email
 *         - nom
 *         - prenom
 *         - telephone
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email du patient
 *           example: "patient@example.com"
 *         nom:
 *           type: string
 *           description: Nom du patient
 *           example: "Dupont"
 *         prenom:
 *           type: string
 *           description: Prénom du patient
 *           example: "Jean"
 *         telephone:
 *           type: string
 *           description: Numéro de téléphone
 *           example: "+33612345678"
 * 
 *     ConnexionRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email de l'utilisateur
 *           example: "utilisateur@example.com"
 *         password:
 *           type: string
 *           description: Mot de passe
 *           example: "MotDePasse123!"
 * 
 *   responses:
 *     PatientActivationResponse:
 *       description: Réponse de l'activation du compte patient
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Message:
 *                 type: string
 *                 description: Message de confirmation ou d'erreur
 * 
 *     PatientCreationResponse:
 *       description: Réponse de la création d'un patient
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Message:
 *                 type: string
 *                 description: Message de confirmation ou d'erreur
 * 
 *     ErrorResponse:
 *       description: Réponse d'erreur standard
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Message:
 *                 type: string
 *                 description: Message d'erreur
 *               Erreur:
 *                 type: string
 *                 description: Détails de l'erreur
 * 
 *   requestBodies:
 *     PatientActivationRequest:
 *       description: Données requises pour l'activation du compte patient
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - token
 *               - motDePasse
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID de l'utilisateur
 *               token:
 *                 type: string
 *                 description: Token JWT d'activation
 *               motDePasse:
 *                 type: string
 *                 description: Nouveau mot de passe
 * 
 *     PatientCreationRequest:
 *       description: Données requises pour la création d'un patient
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - telephone
 *               - sexe
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom du patient
 *               prenom:
 *                 type: string
 *                 description: Prénom du patient
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email du patient
 *               telephone:
 *                 type: string
 *                 description: Numéro de téléphone du patient
 *               sexe:
 *                 type: string
 *                 enum: [M, F]
 *                 description: Sexe du patient
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT token d'authentification
 * 
 *   parameters:
 *     userIdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: ID de l'utilisateur
 * 
 *     tokenParam:
 *       in: query
 *       name: token
 *       required: true
 *       schema:
 *         type: string
 *       description: Token JWT
 * 
 *   examples:
 *     PatientActivationSuccess:
 *       value:
 *         Message: "Mot de passe défini avec succès. Veuillez patientez pendant que nous validons votre compte."
 * 
 *     PatientActivationError:
 *       value:
 *         Message: "Lien invalide ou expiré."
 * 
 *     PatientCreationSuccess:
 *       value:
 *         Message: "Patient ajouté avec succès. Un email a été envoyé pour l'activation du compte."
 * 
 *     PatientCreationError:
 *       value:
 *         Message: "Cet email existe déjà. Veuillez saisir un autre email."
 * 
 *     ServerError:
 *       value:
 *         Message: "Erreur lors de la création du mot de passe."
 *         Erreur: "Détails de l'erreur..."
 */ 