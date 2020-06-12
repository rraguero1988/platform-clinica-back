const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();


const app = express();

//Configuraciones
require('./database');
require('./passport/local-auth');
require('./passport/facebook-auth');
require('./passport/google-auth');



//middleware
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_TOKEN,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use(require('../src/routes/index.router'));
app.use(require('../src/routes/user.router'));

//configuraciones
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo', app.get('port'));
})