# Journal des modifications (CHANGELOG)

## [1.0.0] - 2024-04-12

### Ajouté
- Documentation complète de l'API avec Swagger
  - Documentation des routes administrateur
  - Documentation des routes médecin
  - Documentation des routes infirmier
  - Documentation des routes patient
  - Documentation des schémas de données
  - Documentation des réponses HTTP
- Documentation des modèles de données
  - Documentation du modèle Patient
  - Documentation du modèle Médecin
  - Documentation du modèle Infirmier
  - Documentation du modèle Consultation
  - Documentation du modèle DossierMedical
  - Documentation du modèle ExamenMedical
  - Documentation du modèle Ordonnance
  - Documentation du modèle Prescription
  - Documentation du modèle RendezVous
  - Documentation du modèle Assistance
  - Documentation du modèle Medicament
  - Documentation du modèle Notification
  - Documentation du modèle PlanningTraitement
  - Documentation du modèle TraitementMedical
  - Documentation du modèle TypeExamenMedical
  - Documentation du modèle TypeTraitementMedical
- Documentation des contrôleurs
  - Documentation des réponses API
  - Documentation des corps de requête
  - Documentation des paramètres
  - Documentation des exemples de réponses
  - Documentation des schémas de sécurité
- Documentation des DTOs
  - Documentation du DTO AddPatientByPro
  - Documentation du DTO ActiverCompte
  - Documentation du DTO Connexion
  - Exemples de requêtes pour chaque DTO
- Documentation des middlewares
  - Documentation du middleware d'authentification
  - Documentation du middleware de vérification des permissions
  - Documentation du middleware de validation des utilisateurs
  - Documentation du middleware de validation Yup
  - Exemples d'erreurs pour chaque middleware

### Modifié
- Amélioration des logs du serveur
  - Ajout de morgan pour les logs HTTP détaillés
  - Ajout d'un middleware de gestion des erreurs
  - Amélioration des messages de démarrage du serveur
- Configuration Swagger
  - Ajout de la documentation des modèles
  - Ajout de la documentation des contrôleurs
  - Ajout de la documentation des DTOs
  - Ajout de la documentation des middlewares
  - Configuration du schéma d'authentification JWT
  - Mise à jour des chemins d'API pour inclure les modèles, contrôleurs, DTOs et middlewares

### Détails techniques

#### Documentation Swagger
- Ajout des tags pour chaque type d'utilisateur
- Documentation des paramètres de requête
- Documentation des corps de requête
- Documentation des réponses possibles
- Documentation des exigences de sécurité
- Documentation complète des schémas de données
  - Champs requis
  - Types de données
  - Enums et validations
  - Relations entre modèles
- Documentation des contrôleurs
  - Réponses standardisées
  - Corps de requête standardisés
  - Exemples de réponses
  - Paramètres communs
- Documentation des DTOs
  - Schémas de validation
  - Exemples de requêtes
  - Contraintes de validation
- Documentation des middlewares
  - Schémas d'authentification
  - Schémas de permission
  - Schémas de validation
  - Exemples d'erreurs
- Configuration de l'authentification JWT
  - Schéma bearerAuth
  - Format JWT

#### Logs améliorés
- Format des logs : `:method :url :status :res[content-length] - :response-time ms`
- Messages de démarrage détaillés incluant :
  - Port d'écoute
  - URL de la documentation Swagger
  - Environnement d'exécution

#### Gestion des erreurs
- Middleware de gestion des erreurs ajouté
- Logs d'erreur avec timestamp
- Stack trace en mode développement
- Réponses d'erreur standardisées

### Dependencies ajoutées
- swagger-ui-express
- swagger-jsdoc
- morgan 