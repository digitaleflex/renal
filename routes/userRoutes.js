const express = require('express');
const router = express.Router();
const {enregistrerUtilisateur, userConnected} = require('../controllers/userControllers');
const { validateUserByRole } = require('../middlewares/validateUserByRole');
const { connexionDto } = require('../dto/connexionDto');
const { yupValidator } = require('../middlewares/yup');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           description: Email de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *         role:
 *           type: string
 *           enum: [admin, doctor, nurse, patient]
 *           description: Rôle de l'utilisateur
 */

/**
 * @swagger
 * /api/user/enregistrer:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.post('/enregistrer', validateUserByRole, enregistrerUtilisateur);

/**
 * @swagger
 * /api/user/connecter:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post('/connecter', yupValidator(connexionDto), userConnected);

module.exports = router;