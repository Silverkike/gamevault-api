const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Game title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        enum: ['RPG', 'Shooter', 'Platformer', 'Adventure', 'Sports', 'Racing', 'Strategy', 'Simulation']
    },
    platform: {
        type: String,
        required: [true, 'Platform is required'],
        enum: ['PC', 'PS5', 'PS4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch', 'Mobile']
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year is required'],
        min: [1970, 'Year cannot be earlier than 1970'],
        max: [2026, 'Year cannot be in the future']
    },
    developer: {
        type: String,
        required: [true, 'Developer is required'],
        trim: true
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Minimum rating is 1'],
        max: [10, 'Maximum rating is 10']
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Game', gameSchema);