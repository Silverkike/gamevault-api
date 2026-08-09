const protect = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
    });
};

module.exports = { protect };