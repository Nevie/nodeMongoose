module.exports = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.status(400).json({
            'message': 'access denied'
        });
    }
};