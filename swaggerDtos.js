/**
 * @swagger
 * components:
 *   schemas:
 *     AddPatientByProRequest:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - email
 *         - telephone
 *         - sexe
 *       properties:
 *         nom:
 *           type: string
 *           description: Nom du patient
 *           example: "Dupont"
 *         prenom:
 *           type: string
 *           description: Prénom du patient
 *           example: "Jean"
 *         email:
 *           type: string
 *           format: email
 *           description: Email du patient
 *           example: "jean.dupont@example.com"
 *         telephone:
 *           type: string
 *           description: Numéro de téléphone du patient
 *           example: "+33612345678"
 *         sexe:
 *           type: string
 *           enum: [Masculin, Feminin]
 *           description: Sexe du patient
 *           example: "Masculin"
 *         statutValidation:
 *           type: string
 *           enum: [En attente, Validé, Rejeté]
 *           description: Statut de validation du compte
 *           default: "En attente"
 *           example: "En attente"
 *         ajouterPar:
 *           type: string
 *           format: objectId
 *           description: ID du professionnel qui ajoute le patient
 *           example: "507f1f77bcf86cd799439011"
 * 
 *     ActiverCompteRequest:
 *       type: object
 *       required:
 *         - motDePasse
 *       properties:
 *         motDePasse:
 *           type: string
 *           minLength: 6
 *           description: Nouveau mot de passe du patient
 *           example: "motdepasse123"
 * 
 *     ConnexionRequest:
 *       type: object
 *       required:
 *         - email
 *         - motDePasse
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email de l'utilisateur
 *           example: "jean.dupont@example.com"
 *         motDePasse:
 *           type: string
 *           minLength: 6
 *           description: Mot de passe de l'utilisateur
 *           example: "motdepasse123"
 * 
 *   examples:
 *     AddPatientByProExample:
 *       value:
 *         nom: "Dupont"
 *         prenom: "Jean"
 *         email: "jean.dupont@example.com"
 *         telephone: "+33612345678"
 *         sexe: "Masculin"
 *         statutValidation: "En attente"
 *         ajouterPar: "507f1f77bcf86cd799439011"
 *       summary: Exemple de création de patient par un professionnel
 * 
 *     ActiverCompteExample:
 *       value:
 *         motDePasse: "motdepasse123"
 *       summary: Exemple d'activation de compte
 * 
 *     ConnexionExample:
 *       value:
 *         email: "jean.dupont@example.com"
 *         motDePasse: "motdepasse123"
 *       summary: Exemple de connexion
 */ 