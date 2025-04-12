const express = require('express');
const router = express.Router();
const { addPatientByProfessionnel } = require('../controllers/professionnelControllers');
const { addPatientByProDto } = require('../dto/addPatientByProDto');
const { yupValidator } = require('../middlewares/yup');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Infirmier
 *   description: Gestion des infirmiers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientByPro:
 *       type: object
 *       required:
 *         - email
 *         - nom
 *         - prenom
 *       properties:
 *         email:
 *           type: string
 *           description: Email du patient
 *         nom:
 *           type: string
 *           description: Nom du patient
 *         prenom:
 *           type: string
 *           description: Prénom du patient
 */

/**
 * @swagger
 * /api/nurse/ajouterPatient:
 *   post:
 *     summary: Ajoute un nouveau patient depuis l'interface infirmier
 *     tags: [Infirmier]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientByPro'
 *     responses:
 *       201:
 *         description: Patient ajouté avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Permission refusée
 */
router.post('/ajouterPatient', authMiddleware, checkPermission('Infirmier'), yupValidator(addPatientByProDto), addPatientByProfessionnel);

module.exports = router;