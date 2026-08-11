const Player = require('../models/Player');

// @desc    Get all players
// @route   GET /api/players
// @access  Public
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json({
            success: true,
            count: players.length,
            data: players
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching players',
            error: error.message
        });
    }
};

// @desc    Get single player by ID
// @route   GET /api/players/:id
// @access  Public
const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        res.status(200).json({
            success: true,
            data: player
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching player',
            error: error.message
        });
    }
};

// @desc    Create new player
// @route   POST /api/players
// @access  Private (requires Google OAuth session)
const createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Player created successfully',
            data: player
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
            message: 'Error creating player',
            error: error.message
        });
    }
};

// @desc    Update player by ID
// @route   PUT /api/players/:id
// @access  Private (requires Google OAuth session)
const updatePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Player updated successfully',
            data: player
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
            message: 'Error updating player',
            error: error.message
        });
    }
};

// @desc    Delete player by ID
// @route   DELETE /api/players/:id
// @access  Private (requires Google OAuth session)
const deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Player deleted successfully',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting player',
            error: error.message
        });
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
};