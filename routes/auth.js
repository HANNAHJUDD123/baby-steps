var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);


app.post('/signup', passport.authenticate('local-signup',  
    { successRedirect: '/home',
    failureRedirect: '/'}
));


app.get('/dashboard',isLoggedIn, authController.dashboard);


app.post('/logout',authController.logout);


app.post('/login', passport.authenticate('local-signin',  
    { successRedirect: '/home',
    failureRedirect: '/'}
));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}






