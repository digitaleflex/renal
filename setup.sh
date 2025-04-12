#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification de Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérification de Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Création du fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    print_message "Création du fichier .env..."
    cat > .env << EOL
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:3000
SWAGGER_STATS_USERNAME=admin
SWAGGER_STATS_PASSWORD=admin
ELASTICSEARCH_URL=http://elasticsearch:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=changeme
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/suivi_renal?authSource=admin
EOL
fi

# Installation des dépendances Node.js
print_message "Installation des dépendances Node.js..."
npm install

# Construction et démarrage des conteneurs
print_message "Démarrage des services Docker..."
docker-compose up -d --build

# Attente que les services soient prêts
print_message "Attente que les services soient prêts..."
sleep 10

# Vérification de l'état des services
print_message "Vérification de l'état des services..."

# Vérification d'Elasticsearch
if curl -s -u elastic:changeme http://localhost:9200 > /dev/null; then
    print_message "Elasticsearch est opérationnel"
else
    print_error "Elasticsearch n'est pas accessible"
fi

# Vérification de Kibana
if curl -s http://localhost:5601 > /dev/null; then
    print_message "Kibana est opérationnel"
else
    print_error "Kibana n'est pas accessible"
fi

# Vérification de MongoDB
if docker-compose exec mongodb mongosh --eval "db.version()" > /dev/null; then
    print_message "MongoDB est opérationnel"
else
    print_error "MongoDB n'est pas accessible"
fi

# Vérification de l'API
if curl -s http://localhost:5000 > /dev/null; then
    print_message "L'API est opérationnelle"
else
    print_error "L'API n'est pas accessible"
fi

# Affichage des URLs d'accès
print_message "\nServices disponibles :"
echo -e "${YELLOW}API:${NC} http://localhost:5000"
echo -e "${YELLOW}Documentation Swagger:${NC} http://localhost:5000/api-docs"
echo -e "${YELLOW}Swagger Stats:${NC} http://localhost:5000/swagger-stats"
echo -e "${YELLOW}Kibana:${NC} http://localhost:5601"
echo -e "${YELLOW}MongoDB Express:${NC} http://localhost:8081"

print_message "\nConfiguration terminée !"
print_warning "N'oubliez pas de changer les mots de passe par défaut dans le fichier .env" 