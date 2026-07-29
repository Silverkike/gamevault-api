const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'GameVault API',
            version: '1.0.0',
            description: 'API for managing video games and players with CRUD operations',
            contact: {
                name: 'Enrique Guardado'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./routes/*.js'] // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };