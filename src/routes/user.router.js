const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { routerLoginGet,
    routerRegistroGet,
    routerSalirGet,
    routerPerfilGet,
    routerUsuarioGet,
    routerUsuariosGet
} = require('../controller/user.controller')


//prueba de las puebas

//Autenticar  Local
router.post('/iniciar', passport.authenticate('local-login', {
    successRedirect: '/perfil',
    failureRedirect: '/iniciar',
    passReqToCallback: true
}))

router.post('/registro', passport.authenticate('local-registro', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    passReqToCallback: true
}))

//Autenticar Facebook

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/perfil',
        failureRedirect: '/iniciar'
    }));

//Autenticar Google
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/iniciar' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/perfil');
    });

router.get('/usuario/:id', routerUsuarioGet);
router.get('/usuarios', routerUsuariosGet);


router.get('/salir', routerSalirGet)
router.get('/perfil', routerPerfilGet)
module.exports = router
