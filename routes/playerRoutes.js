const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
} = require('../controllers/playerController');

/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: List of all players
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Player'
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerInput'
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     summary: Get a player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player found
 *       404:
 *         description: Player not found
 *   put:
 *     summary: Update a player by ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerInput'
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       404:
 *         description: Player not found
 *   delete:
 *     summary: Delete a player by ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 */

router.route('/')
    .get(getAllPlayers)
    .post(protect, createPlayer);

router.route('/:id')
    .get(getPlayerById)
    .put(protect, updatePlayer)
    .delete(protect, deletePlayer);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         username:
 *           type: string
 *           description: Unique username
 *         email:
 *           type: string
 *           format: email
 *         favoriteGenre:
 *           type: string
 *           enum: [RPG, Shooter, Platformer, Adventure, Sports, Racing, Strategy, Simulation]
 *         gamerTag:
 *           type: string
 *         joinDate:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PlayerInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         favoriteGenre:
 *           type: string
 *         gamerTag:
 *           type: string
 *         joinDate:
 *           type: string
 *           format: date-time
 */