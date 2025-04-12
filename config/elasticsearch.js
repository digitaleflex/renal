const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
});

// Création des index pour les différentes entités
const createIndices = async () => {
  try {
    // Index pour les logs d'API
    await client.indices.create({
      index: 'api-logs',
      body: {
        mappings: {
          properties: {
            timestamp: { type: 'date' },
            level: { type: 'keyword' },
            message: { type: 'text' },
            requestId: { type: 'keyword' },
            method: { type: 'keyword' },
            url: { type: 'keyword' },
            status: { type: 'integer' },
            responseTime: { type: 'float' }
          }
        }
      }
    });

    // Index pour les statistiques d'API
    await client.indices.create({
      index: 'api-stats',
      body: {
        mappings: {
          properties: {
            timestamp: { type: 'date' },
            endpoint: { type: 'keyword' },
            method: { type: 'keyword' },
            responseTime: { type: 'float' },
            status: { type: 'integer' },
            requestSize: { type: 'integer' },
            responseSize: { type: 'integer' }
          }
        }
      }
    });

    // Index pour les erreurs
    await client.indices.create({
      index: 'api-errors',
      body: {
        mappings: {
          properties: {
            timestamp: { type: 'date' },
            requestId: { type: 'keyword' },
            error: { type: 'text' },
            stack: { type: 'text' },
            endpoint: { type: 'keyword' },
            method: { type: 'keyword' }
          }
        }
      }
    });

    console.log('Indices créés avec succès');
  } catch (error) {
    console.error('Erreur lors de la création des indices:', error);
  }
};

// Fonctions utilitaires pour l'indexation
const indexLog = async (logData) => {
  try {
    await client.index({
      index: 'api-logs',
      body: {
        ...logData,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'indexation du log:', error);
  }
};

const indexStat = async (statData) => {
  try {
    await client.index({
      index: 'api-stats',
      body: {
        ...statData,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'indexation de la statistique:', error);
  }
};

const indexError = async (errorData) => {
  try {
    await client.index({
      index: 'api-errors',
      body: {
        ...errorData,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'indexation de l\'erreur:', error);
  }
};

// Fonctions de recherche
const searchLogs = async (query) => {
  try {
    const { body } = await client.search({
      index: 'api-logs',
      body: {
        query: {
          bool: {
            must: [
              { match: { message: query } }
            ]
          }
        }
      }
    });
    return body.hits.hits;
  } catch (error) {
    console.error('Erreur lors de la recherche de logs:', error);
    return [];
  }
};

const getStats = async (timeRange) => {
  try {
    const { body } = await client.search({
      index: 'api-stats',
      body: {
        query: {
          range: {
            timestamp: {
              gte: `now-${timeRange}`
            }
          }
        },
        aggs: {
          avg_response_time: {
            avg: { field: 'responseTime' }
          },
          total_requests: {
            value_count: { field: 'endpoint' }
          }
        }
      }
    });
    return body.aggregations;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return null;
  }
};

module.exports = {
  client,
  createIndices,
  indexLog,
  indexStat,
  indexError,
  searchLogs,
  getStats
}; 