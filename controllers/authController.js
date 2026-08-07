const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: ['Email, username, and password are required']
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            passwordHash: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
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
            message: 'Error registering user',
            error: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: ['Email and password are required']
            });
        }

        const user = await User.findOne({ email }).select('+passwordHash');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in user',
            error: error.message
        });
    }
};

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Public
const logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

module.exports = {
    register,
    login,
    logout
};
