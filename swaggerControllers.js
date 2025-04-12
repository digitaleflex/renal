/**
 * @swagger
 * components:
 *   schemas:
 *     // ... existing schemas ...
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