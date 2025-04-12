/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - dateNaissance
 *         - adresse
 *         - groupeSanguin
 *         - situationMatrimoniale
 *         - contactUrgence
 *         - electroPhorese
 *         - idUtilisateur
 *       properties:
 *         dateNaissance:
 *           type: string
 *           format: date
 *           description: Date de naissance du patient
 *           example: "1990-01-01"
 *         adresse:
 *           type: string
 *           description: Adresse du patient
 *           example: "123 Rue de la Paix, 75001 Paris"
 *         groupeSanguin:
 *           type: string
 *           enum: [A+, A-, B+, B-, AB+, AB-, O+, O-]
 *           description: Groupe sanguin du patient
 *           example: "A+"
 *         allergiesConnues:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des allergies connues
 *           example: ["Pénicilline", "Arachides"]
 *         situationMatrimoniale:
 *           type: string
 *           enum: [Célibataire, Marié(e), Divorcé(e), Veuf(ve)]
 *           description: Situation matrimoniale du patient
 *           example: "Marié(e)"
 *         contactUrgence:
 *           type: string
 *           description: Contact en cas d'urgence
 *           example: "+33612345678"
 *         electroPhorese:
 *           type: string
 *           enum: [AA, AC, AS, SC, SS]
 *           description: Résultat de l'électrophorèse
 *           example: "AA"
 *         idUtilisateur:
 *           type: string
 *           format: objectId
 *           description: ID de l'utilisateur associé
 *           example: "507f1f77bcf86cd799439011"
 *         idMedecinPrincipal:
 *           type: string
 *           format: objectId
 *           description: ID du médecin principal
 *           example: "507f1f77bcf86cd799439012"
 * 
 *     Medecin:
 *       type: object
 *       required:
 *         - specialite
 *         - numeroLicence
 *         - signature
 *         - idUtilisateur
 *       properties:
 *         specialite:
 *           type: string
 *           enum: [Généraliste, Neuphrologue]
 *           description: Spécialité du médecin
 *           example: "Neuphrologue"
 *         numeroLicence:
 *           type: string
 *           description: Numéro de licence du médecin
 *           example: "123456789"
 *         signature:
 *           type: string
 *           format: binary
 *           description: Signature du médecin
 *           example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *         idUtilisateur:
 *           type: string
 *           format: objectId
 *           description: ID de l'utilisateur associé
 *           example: "507f1f77bcf86cd799439013"
 * 
 *     Infirmier:
 *       type: object
 *       required:
 *         - idUtilisateur
 *       properties:
 *         idUtilisateur:
 *           type: string
 *           format: objectId
 *           description: ID de l'utilisateur associé
 *           example: "507f1f77bcf86cd799439014"
 * 
 *     Consultation:
 *       type: object
 *       required:
 *         - date
 *         - motif
 *         - idPatient
 *         - idMedecin
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date et heure de la consultation
 *           example: "2024-04-12T14:30:00Z"
 *         motif:
 *           type: string
 *           description: Motif de la consultation
 *           example: "Suivi rénal régulier"
 *         observations:
 *           type: string
 *           description: Observations du médecin
 *           example: "Patient stable, tension artérielle normale"
 *         idPatient:
 *           type: string
 *           format: objectId
 *           description: ID du patient
 *           example: "507f1f77bcf86cd799439011"
 *         idMedecin:
 *           type: string
 *           format: objectId
 *           description: ID du médecin
 *           example: "507f1f77bcf86cd799439013"
 * 
 *     DossierMedical:
 *       type: object
 *       required:
 *         - idPatient
 *       properties:
 *         idPatient:
 *           type: string
 *           format: objectId
 *           description: ID du patient
 *           example: "507f1f77bcf86cd799439011"
 *         antecedents:
 *           type: string
 *           description: Antécédents médicaux
 *           example: "Hypertension artérielle, Diabète type 2"
 *         traitementsEnCours:
 *           type: string
 *           description: Traitements en cours
 *           example: "Médicament A 1x/jour, Médicament B 2x/jour"
 *         allergies:
 *           type: string
 *           description: Allergies connues
 *           example: "Pénicilline, Arachides"
 * 
 *     ExamenMedical:
 *       type: object
 *       required:
 *         - date
 *         - type
 *         - idPatient
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date de l'examen
 *           example: "2024-04-12T09:00:00Z"
 *         type:
 *           type: string
 *           description: Type d'examen
 *           example: "Analyse de sang"
 *         resultats:
 *           type: string
 *           description: Résultats de l'examen
 *           example: "Créatinine: 1.2 mg/dL, Urée: 40 mg/dL"
 *         idPatient:
 *           type: string
 *           format: objectId
 *           description: ID du patient
 *           example: "507f1f77bcf86cd799439011"
 * 
 *     Ordonnance:
 *       type: object
 *       required:
 *         - date
 *         - idPatient
 *         - idMedecin
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Date de l'ordonnance
 *           example: "2024-04-12"
 *         idPatient:
 *           type: string
 *           format: objectId
 *           description: ID du patient
 *           example: "507f1f77bcf86cd799439011"
 *         idMedecin:
 *           type: string
 *           format: objectId
 *           description: ID du médecin
 *           example: "507f1f77bcf86cd799439013"
 *         prescriptions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Prescription'
 *           example:
 *             - medicament: "Médicament A"
 *               posologie: "1 comprimé matin et soir"
 *               duree: "30 jours"
 *             - medicament: "Médicament B"
 *               posologie: "2 comprimés par jour"
 *               duree: "15 jours"
 * 
 *     Prescription:
 *       type: object
 *       required:
 *         - medicament
 *         - posologie
 *       properties:
 *         medicament:
 *           type: string
 *           description: Nom du médicament
 *           example: "Médicament A"
 *         posologie:
 *           type: string
 *           description: Posologie du médicament
 *           example: "1 comprimé matin et soir"
 *         duree:
 *           type: string
 *           description: Durée du traitement
 *           example: "30 jours"
 * 
 *     RendezVous:
 *       type: object
 *       required:
 *         - date
 *         - idPatient
 *         - idMedecin
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date et heure du rendez-vous
 *           example: "2024-04-15T10:00:00Z"
 *         motif:
 *           type: string
 *           description: Motif du rendez-vous
 *           example: "Consultation de suivi"
 *         idPatient:
 *           type: string
 *           format: objectId
 *           description: ID du patient
 *           example: "507f1f77bcf86cd799439011"
 *         idMedecin:
 *           type: string
 *           format: objectId
 *           description: ID du médecin
 *           example: "507f1f77bcf86cd799439013"
 *         statut:
 *           type: string
 *           enum: [Planifié, Confirmé, Annulé, Terminé]
 *           description: Statut du rendez-vous
 *           example: "Planifié"
 * 
 *     Assistance:
 *       type: object
 *       required:
 *         - dateObservation
 *         - observation
 *         - idInfirmier
 *         - idTraitementMedical
 *       properties:
 *         dateObservation:
 *           type: string
 *           format: date-time
 *           description: Date de l'observation
 *           example: "2024-04-12T15:30:00Z"
 *         observation:
 *           type: string
 *           description: Observation de l'infirmier
 *           example: "Patient bien réceptif au traitement"
 *         idInfirmier:
 *           type: string
 *           format: objectId
 *           description: ID de l'infirmier
 *           example: "507f1f77bcf86cd799439014"
 *         idTraitementMedical:
 *           type: string
 *           format: objectId
 *           description: ID du traitement médical
 *           example: "507f1f77bcf86cd799439015"
 * 
 *     Medicament:
 *       type: object
 *       required:
 *         - nomCommercial
 *         - nomScientifique
 *         - dosage
 *         - formePharmaceutique
 *         - modeAdministration
 *       properties:
 *         nomCommercial:
 *           type: string
 *           description: Nom commercial du médicament
 *           example: "Médicament A"
 *         nomScientifique:
 *           type: string
 *           description: Nom scientifique du médicament
 *           example: "Substance Active 500mg"
 *         dosage:
 *           type: string
 *           description: Dosage du médicament
 *           example: "500mg"
 *         formePharmaceutique:
 *           type: string
 *           description: Forme pharmaceutique
 *           example: "Comprimé"
 *         modeAdministration:
 *           type: string
 *           description: Mode d'administration
 *           example: "Voie orale"
 * 
 *     Notification:
 *       type: object
 *       required:
 *         - type
 *         - message
 *         - idDestinataire
 *       properties:
 *         type:
 *           type: string
 *           enum: [Info, Alerte, Rappel]
 *           description: Type de notification
 *           example: "Rappel"
 *         message:
 *           type: string
 *           description: Message de la notification
 *           example: "Rappel: Consultation demain à 10h"
 *         idDestinataire:
 *           type: string
 *           format: objectId
 *           description: ID du destinataire
 *           example: "507f1f77bcf86cd799439011"
 *         lu:
 *           type: boolean
 *           description: État de lecture de la notification
 *           example: false
 * 
 *     PlanningTraitement:
 *       type: object
 *       required:
 *         - dateDebut
 *         - dateFin
 *         - idPatient
 *         - idTraitementMedical
 *       properties:
 *         dateDebut:
 *           type: string
 *           format: date
 *           description: Date de début du traitement
 *           example: "2024-04-12"
 *         dateFin:
 *           type: string
 *           format: date
 *           description: Date de fin du traitement
 *           example: "2024-05-12"
 *         idPatient:
 *           type: string
 *           format: objectId
 *           description: ID du patient
 *           example: "507f1f77bcf86cd799439011"
 *         idTraitementMedical:
 *           type: string
 *           format: objectId
 *           description: ID du traitement médical
 *           example: "507f1f77bcf86cd799439015"
 *         frequence:
 *           type: string
 *           description: Fréquence du traitement
 *           example: "2 fois par jour"
 * 
 *     TraitementMedical:
 *       type: object
 *       required:
 *         - nom
 *         - description
 *         - idTypeTraitement
 *       properties:
 *         nom:
 *           type: string
 *           description: Nom du traitement
 *           example: "Traitement A"
 *         description:
 *           type: string
 *           description: Description du traitement
 *           example: "Traitement pour insuffisance rénale"
 *         idTypeTraitement:
 *           type: string
 *           format: objectId
 *           description: ID du type de traitement
 *           example: "507f1f77bcf86cd799439016"
 *         instructions:
 *           type: string
 *           description: Instructions spécifiques
 *           example: "Prendre avant les repas"
 * 
 *     TypeExamenMedical:
 *       type: object
 *       required:
 *         - nom
 *         - description
 *       properties:
 *         nom:
 *           type: string
 *           description: Nom du type d'examen
 *           example: "Analyse de sang"
 *         description:
 *           type: string
 *           description: Description du type d'examen
 *           example: "Analyse complète du sang"
 * 
 *     TypeTraitementMedical:
 *       type: object
 *       required:
 *         - nom
 *         - description
 *       properties:
 *         nom:
 *           type: string
 *           description: Nom du type de traitement
 *           example: "Traitement chronique"
 *         description:
 *           type: string
 *           description: Description du type de traitement
 *           example: "Traitement à long terme"
 */ 