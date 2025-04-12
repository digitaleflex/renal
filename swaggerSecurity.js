/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT token d'authentification
 * 
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message d'erreur
 *         code:
 *           type: string
 *           description: Code d'erreur
 *         details:
 *           type: object
 *           description: Détails supplémentaires de l'erreur
 * 
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message d'erreur de validation
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 description: Chemin du champ en erreur
 *               message:
 *                 type: string
 *                 description: Message d'erreur spécifique
 * 
 *   parameters:
 *     pageParam:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *       description: Numéro de la page
 * 
 *     limitParam:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         default: 10
 *       description: Nombre d'éléments par page
 * 
 *     sortParam:
 *       in: query
 *       name: sort
 *       schema:
 *         type: string
 *       description: Champ de tri
 * 
 *     orderParam:
 *       in: query
 *       name: order
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *         default: asc
 *       description: Ordre de tri
 * 
 *   responses:
 *     UnauthorizedError:
 *       description: Non autorisé
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             message: "Non autorisé"
 *             code: "UNAUTHORIZED"
 * 
 *     ForbiddenError:
 *       description: Permission refusée
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             message: "Permission refusée"
 *             code: "FORBIDDEN"
 * 
 *     ValidationError:
 *       description: Erreur de validation
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidationError'
 *           example:
 *             message: "Erreur de validation"
 *             errors:
 *               - path: "email"
 *                 message: "L'email est requis"
 * 
 *   examples:
 *     JWTToken:
 *       value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       summary: Exemple de token JWT
 * 
 *     UserRoles:
 *       value:
 *         - "Administrateur"
 *         - "Medecin"
 *         - "Infirmier"
 *         - "Patient"
 *       summary: Liste des rôles disponibles
 */ 