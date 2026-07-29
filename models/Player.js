const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    favoriteGenre: {
        type: String,
        enum: ['RPG', 'Shooter', 'Platformer', 'Adventure', 'Sports', 'Racing', 'Strategy', 'Simulation']
    },
    gamerTag: {
        type: String,
        trim: true,
        maxlength: [20, 'GamerTag cannot exceed 20 characters']
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);