require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/database');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const playerRoutes = require('./routes/playerRoutes');
const { swaggerUi, swaggerDocs } = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'gamevault-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to GameVault API! 🎮' });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/players', playerRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(` API Documentation available at http://localhost:${PORT}/api-docs`);
});