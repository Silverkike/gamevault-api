const googleCallback = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged in successfully via Google',
        data: req.user
    });
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error logging out',
                error: err.message
            });
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error destroying session',
                    error: err.message
                });
            }

            res.clearCookie('connect.sid');
            return res.status(200).json({
                success: true,
                message: 'Logged out successfully'
            });
        });
    });
};

module.exports = {
    googleCallback,
    logout
};
