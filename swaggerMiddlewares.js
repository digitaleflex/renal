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
 *     AuthError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message d'erreur d'authentification
 *           example: "Accès refusé. Aucun jeton n'a été fourni"
 * 
 *     RoleError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Message d'erreur de permission
 *           example: "Accès refusé, vous n'avez pas les autorisations nécessaires."
 * 
 *     ValidationError:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indique si une erreur s'est produite
 *           example: true
 *         message:
 *           type: string
 *           description: Message d'erreur de validation
 *           example: "Le champ 'email' est requis"
 * 
 *   parameters:
 *     Authorization:
 *       in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       description: Token JWT au format "Bearer [token]"
 *       required: true
 *       example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * 
 *   responses:
 *     UnauthorizedError:
 *       description: Erreur d'authentification
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthError'
 * 
 *     ForbiddenError:
 *       description: Erreur de permission
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleError'
 * 
 *     ValidationError:
 *       description: Erreur de validation
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidationError'
 * 
 *   examples:
 *     AuthErrorExample:
 *       value:
 *         message: "Accès refusé. Aucun jeton n'a été fourni"
 *       summary: Exemple d'erreur d'authentification
 * 
 *     RoleErrorExample:
 *       value:
 *         error: "Accès refusé, vous n'avez pas les autorisations nécessaires."
 *       summary: Exemple d'erreur de permission
 * 
 *     ValidationErrorExample:
 *       value:
 *         error: true
 *         message: "Le champ 'email' est requis"
 *       summary: Exemple d'erreur de validation
 * 
 *   x-middlewares:
 *     authMiddleware:
 *       description: Middleware d'authentification JWT
 *       parameters:
 *         - $ref: '#/components/parameters/Authorization'
 *       responses:
 *         - $ref: '#/components/responses/UnauthorizedError'
 * 
 *     checkPermission:
 *       description: Middleware de vérification des permissions
 *       parameters:
 *         - name: permissions
 *           in: query
 *           required: true
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *               enum: [Administrateur, Medecin, Infirmier, Patient]
 *       responses:
 *         - $ref: '#/components/responses/ForbiddenError'
 * 
 *     validateUserByRole:
 *       description: Middleware de validation des utilisateurs selon leur rôle
 *       parameters:
 *         - name: role
 *           in: body
 *           required: true
 *           schema:
 *             type: string
 *             enum: [Patient, Medecin, Infirmier]
 *       responses:
 *         - $ref: '#/components/responses/ValidationError'
 * 
 *     yupValidator:
 *       description: Middleware de validation Yup
 *       parameters:
 *         - name: schema
 *           in: query
 *           required: true
 *           schema:
 *             type: object
 *       responses:
 *         - $ref: '#/components/responses/ValidationError'
 */ 