let logHelp = require('../helpers/loginHelper');
let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Auth' });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/auth/profile',
    failureRedirect : 'auth/signup'
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/auth/profile',
    failureRedirect : 'auth/login'
}));

router.get('/profile', logHelp.isLoggedIn, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/logout', logHelp.isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'successfully logout'
    });
});

router.get('/facebook',
    passport.authenticate('facebook', {
        successRedirect : '/auth/profile',
        failureRedirect : 'auth/login'
    }));

module.exports = router;