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
 *         adresse:
 *           type: string
 *           description: Adresse du patient
 *         groupeSanguin:
 *           type: string
 *           enum: [A+, A-, B+, B-, AB+, AB-, O+, O-]
 *           description: Groupe sanguin du patient
 *         allergiesConnues:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des allergies connues
 *         situationMatrimoniale:
 *           type: string
 *           enum: [Célibataire, Marié(e), Divorcé(e), Veuf(ve)]
 *           description: Situation matrimoniale du patient
 *         contactUrgence:
 *           type: string
 *           description: Contact en cas d'urgence
 *         electroPhorese:
 *           type: string
 *           enum: [AA, AC, AS, SC, SS]
 *           description: Résultat de l'électrophorèse
 *         idUtilisateur:
 *           type: string
 *           description: ID de l'utilisateur associé
 *         idMedecinPrincipal:
 *           type: string
 *           description: ID du médecin principal
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
 *         numeroLicence:
 *           type: string
 *           description: Numéro de licence du médecin
 *         signature:
 *           type: string
 *           format: binary
 *           description: Signature du médecin
 *         idUtilisateur:
 *           type: string
 *           description: ID de l'utilisateur associé
 * 
 *     Infirmier:
 *       type: object
 *       required:
 *         - idUtilisateur
 *       properties:
 *         idUtilisateur:
 *           type: string
 *           description: ID de l'utilisateur associé
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
 *         motif:
 *           type: string
 *           description: Motif de la consultation
 *         observations:
 *           type: string
 *           description: Observations du médecin
 *         idPatient:
 *           type: string
 *           description: ID du patient
 *         idMedecin:
 *           type: string
 *           description: ID du médecin
 * 
 *     DossierMedical:
 *       type: object
 *       required:
 *         - idPatient
 *       properties:
 *         idPatient:
 *           type: string
 *           description: ID du patient
 *         antecedents:
 *           type: string
 *           description: Antécédents médicaux
 *         traitementsEnCours:
 *           type: string
 *           description: Traitements en cours
 *         allergies:
 *           type: string
 *           description: Allergies connues
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
 *         type:
 *           type: string
 *           description: Type d'examen
 *         resultats:
 *           type: string
 *           description: Résultats de l'examen
 *         idPatient:
 *           type: string
 *           description: ID du patient
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
 *         idPatient:
 *           type: string
 *           description: ID du patient
 *         idMedecin:
 *           type: string
 *           description: ID du médecin
 *         prescriptions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Prescription'
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
 *         posologie:
 *           type: string
 *           description: Posologie du médicament
 *         duree:
 *           type: string
 *           description: Durée du traitement
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
 *         motif:
 *           type: string
 *           description: Motif du rendez-vous
 *         idPatient:
 *           type: string
 *           description: ID du patient
 *         idMedecin:
 *           type: string
 *           description: ID du médecin
 *         statut:
 *           type: string
 *           enum: [Planifié, Confirmé, Annulé, Terminé]
 *           description: Statut du rendez-vous
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
 *         observation:
 *           type: string
 *           description: Observation de l'infirmier
 *         idInfirmier:
 *           type: string
 *           description: ID de l'infirmier
 *         idTraitementMedical:
 *           type: string
 *           description: ID du traitement médical
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
 *         nomScientifique:
 *           type: string
 *           description: Nom scientifique du médicament
 *         dosage:
 *           type: string
 *           description: Dosage du médicament
 *         formePharmaceutique:
 *           type: string
 *           description: Forme pharmaceutique
 *         modeAdministration:
 *           type: string
 *           description: Mode d'administration
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
 *           enum: [Rappel, Alerte, Information]
 *           description: Type de notification
 *         message:
 *           type: string
 *           description: Contenu de la notification
 *         idDestinataire:
 *           type: string
 *           description: ID du destinataire
 *         lu:
 *           type: boolean
 *           default: false
 *           description: État de lecture
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
 *         dateFin:
 *           type: string
 *           format: date
 *           description: Date de fin du traitement
 *         idPatient:
 *           type: string
 *           description: ID du patient
 *         idTraitementMedical:
 *           type: string
 *           description: ID du traitement médical
 *         frequence:
 *           type: string
 *           description: Fréquence du traitement
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
 *         description:
 *           type: string
 *           description: Description du traitement
 *         idTypeTraitement:
 *           type: string
 *           description: ID du type de traitement
 *         instructions:
 *           type: string
 *           description: Instructions spécifiques
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
 *         description:
 *           type: string
 *           description: Description du type d'examen
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
 *         description:
 *           type: string
 *           description: Description du type de traitement
 */ 