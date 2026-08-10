const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'GameVault API',
            version: '1.0.0',
            description: 'API for managing video games and players with CRUD operations. Authentication uses Google OAuth 2.0 and an express-session cookie, not a self-issued JWT.',
            contact: {
                name: 'Enrique Guardado'
            }
        },
        servers: [
            {
                url: 'https://gamevault-api-8in3.onrender.com',
                description: 'Render Production Server'
            },
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid',
                    description: 'Session cookie set after successful Google OAuth 2.0 login (GET /api/auth/google). After logging in via the browser, Swagger UI sends this cookie automatically because it is same-origin.'
                }
            }
        }
    },
    apis: ['./routes/*.js'] // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };