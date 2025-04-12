const express = require('express');
const router = express.Router();
const { activerCompte } = require('../controllers/patientControllers');
const { activerCompteDto } = require('../dto/activerCompteDto');
const { yupValidator } = require('../middlewares/yup');

/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: Gestion des patients
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ActiverCompte:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email du patient
 *         password:
 *           type: string
 *           description: Nouveau mot de passe
 */

/**
 * @swagger
 * /api/patient/activerCompte:
 *   post:
 *     summary: Active le compte patient en définissant le mot de passe
 *     tags: [Patient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActiverCompte'
 *     responses:
 *       200:
 *         description: Compte activé avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Patient non trouvé
 */
router.post('/activerCompte', yupValidator(activerCompteDto), activerCompte);

module.exports = router;