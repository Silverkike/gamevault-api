const express = require('express');
const passport = require('passport');
const { googleCallback, logout } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Authenticate with Google OAuth
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback route
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged in successfully via Google
 *       302:
 *         description: Redirects on failure
 */
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api-docs' }), googleCallback);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Log out from Google OAuth session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.get('/logout', logout);

module.exports = router;
