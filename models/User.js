const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    passwordHash: {
        type: String,
        required: [true, 'Password hash is required']
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    authId: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.passwordHash;
    delete userObject.refreshToken;
    return userObject;
};

module.exports = mongoose.model('User', userSchema);
