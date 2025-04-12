const express = require('express');
const router = express.Router();
const {validerPatient, validerMedecin, validerInfirmier} = require('../controllers/validerCompteControllers');
const {getUtilisateursEnAttente, getUtilisateurById} = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Administrateur
 *   description: Gestion des administrateurs
 */

/**
 * @swagger
 * /api/admin/utilisateurs/en_attente:
 *   get:
 *     summary: Récupère la liste des utilisateurs en attente de validation
 *     tags: [Administrateur]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs en attente
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Permission refusée
 */
router.get('/utilisateurs/en_attente', authMiddleware, checkPermission('Administrateur'), getUtilisateursEnAttente);

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
router.get('/utilisateurs/:id', authMiddleware, checkPermission('Administrateur'), getUtilisateurById);

/**
 * @swagger
 * /api/admin/validerPatient/{id}:
 *   put:
 *     summary: Valide un compte patient
 *     tags: [Administrateur]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du patient
 *     responses:
 *       200:
 *         description: Patient validé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Patient non trouvé
 */
router.put('/validerPatient/:id', authMiddleware, checkPermission('Administrateur'), validerPatient);

/**
 * @swagger
 * /api/admin/validerMedecin/{id}:
 *   put:
 *     summary: Valide un compte médecin
 *     tags: [Administrateur]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du médecin
 *     responses:
 *       200:
 *         description: Médecin validé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Médecin non trouvé
 */
router.put('/validerMedecin/:id', authMiddleware, checkPermission('Administrateur'), validerMedecin);

/**
 * @swagger
 * /api/admin/validerInfirmier/{id}:
 *   put:
 *     summary: Valide un compte infirmier
 *     tags: [Administrateur]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'infirmier
 *     responses:
 *       200:
 *         description: Infirmier validé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Infirmier non trouvé
 */
router.put('/validerInfirmier/:id', authMiddleware, checkPermission('Administrateur'), validerInfirmier);

module.exports = router;