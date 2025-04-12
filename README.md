# Application de Suivi Rénal

Une application web complète pour le suivi des patients rénaux, permettant aux professionnels de santé (médecins, infirmiers) et aux patients de gérer efficacement les traitements et le suivi médical.

## Fonctionnalités

### Pour les Administrateurs
- Gestion des utilisateurs
- Validation des comptes (patients, médecins, infirmiers)
- Supervision du système

### Pour les Médecins
- Gestion des patients
- Création et suivi des consultations
- Prescription de traitements
- Planification des examens médicaux
- Gestion des dossiers médicaux

### Pour les Infirmiers
- Suivi des patients
- Assistance aux traitements
- Gestion des rendez-vous
- Documentation des observations

### Pour les Patients
- Accès à leur dossier médical
- Consultation des traitements
- Gestion des rendez-vous
- Suivi des examens médicaux

## Technologies Utilisées

### Backend
- Node.js
- Express.js
- MongoDB
- JWT pour l'authentification
- Yup pour la validation
- Swagger pour la documentation API

### Frontend
- React.js
- Material-UI
- Redux pour la gestion d'état
- Axios pour les requêtes API

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

### Étapes d'installation

1. Cloner le dépôt :
```bash
git clone [URL_DU_REPO]
cd Suivi_renale-main
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
```
Puis éditer le fichier `.env` avec vos configurations.

4. Démarrer le serveur :
```bash
npm start
```

## Documentation API

La documentation complète de l'API est disponible via Swagger UI à l'adresse :
```
http://localhost:5000/api-docs
```

### Points d'entrée principaux
- `/api/admin` - Routes administrateur
- `/api/doctor` - Routes médecin
- `/api/nurse` - Routes infirmier
- `/api/patient` - Routes patient
- `/api/user` - Routes utilisateur

## Structure du Projet

```
Suivi_renale-main/
├── config/           # Configuration de la base de données
├── controllers/      # Contrôleurs de l'application
├── middlewares/      # Middlewares personnalisés
├── models/          # Modèles de données
├── routes/          # Routes de l'API
├── dto/            # Schémas de validation
├── swagger/        # Documentation Swagger
└── app.js          # Point d'entrée de l'application
```

## Sécurité

- Authentification JWT
- Validation des rôles et permissions
- Validation des données avec Yup
- Protection contre les injections
- Gestion sécurisée des mots de passe

## Gestion des Erreurs

- Middleware de gestion des erreurs centralisé
- Logs détaillés avec morgan
- Réponses d'erreur standardisées
- Stack trace en mode développement

## Tests

Pour exécuter les tests :
```bash
npm test
```

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter à [EMAIL].

## Remerciements

- Tous les contributeurs qui ont participé au projet
- La communauté open source pour les outils utilisés
- Les professionnels de santé pour leurs retours et suggestions
