const express = require('express');
const router = express.Router();
const {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/gameController');

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of all games
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
 *                     $ref: '#/components/schemas/Game'
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameInput'
 *     responses:
 *       201:
 *         description: Game created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game found
 *       404:
 *         description: Game not found
 *   put:
 *     summary: Update a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameInput'
 *     responses:
 *       200:
 *         description: Game updated successfully
 *       404:
 *         description: Game not found
 *   delete:
 *     summary: Delete a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *       404:
 *         description: Game not found
 */

router.route('/')
    .get(getAllGames)
    .post(createGame);

router.route('/:id')
    .get(getGameById)
    .put(updateGame)
    .delete(deleteGame);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - platform
 *         - releaseYear
 *         - developer
 *         - publisher
 *         - rating
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         title:
 *           type: string
 *           description: Game title
 *         genre:
 *           type: string
 *           enum: [RPG, Shooter, Platformer, Adventure, Sports, Racing, Strategy, Simulation]
 *         platform:
 *           type: string
 *           enum: [PC, PS5, PS4, Xbox Series X, Xbox One, Nintendo Switch, Mobile]
 *         releaseYear:
 *           type: number
 *           minimum: 1970
 *           maximum: 2026
 *         developer:
 *           type: string
 *         publisher:
 *           type: string
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 10
 *         isCompleted:
 *           type: boolean
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     GameInput:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - platform
 *         - releaseYear
 *         - developer
 *         - publisher
 *         - rating
 *       properties:
 *         title:
 *           type: string
 *         genre:
 *           type: string
 *         platform:
 *           type: string
 *         releaseYear:
 *           type: number
 *         developer:
 *           type: string
 *         publisher:
 *           type: string
 *         rating:
 *           type: number
 *         isCompleted:
 *           type: boolean
 */