const Game = require('../models/Game');

// @desc    Get all games
// @route   GET /api/games
// @access  Public
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json({
            success: true,
            count: games.length,
            data: games
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching games',
            error: error.message
        });
    }
};

// @desc    Get single game by ID
// @route   GET /api/games/:id
// @access  Public
const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Game not found'
            });
        }

        res.status(200).json({
            success: true,
            data: game
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching game',
            error: error.message
        });
    }
};

// @desc    Create new game
// @route   POST /api/games
// @access  Private (requires Google OAuth session)
const createGame = async (req, res) => {
    try {
        const game = await Game.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Game created successfully',
            data: game
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating game',
            error: error.message
        });
    }
};

// @desc    Update game by ID
// @route   PUT /api/games/:id
// @access  Private (requires Google OAuth session)
const updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Game not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Game updated successfully',
            data: game
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating game',
            error: error.message
        });
    }
};

// @desc    Delete game by ID
// @route   DELETE /api/games/:id
// @access  Private (requires Google OAuth session)
const deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);

        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Game not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Game deleted successfully',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting game',
            error: error.message
        });
    }
};

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};