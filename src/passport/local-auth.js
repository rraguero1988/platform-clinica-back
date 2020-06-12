const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');
const UserModel = new User();



passport.serializeUser((user, done) => {
   return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user)
})

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    userpasswordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ "local.email": email });
    if (!user) {
         done(null, false, { message: 'Usted tiene que autenticarse' })
    }
    if (await UserModel.comparePassword(password, user)) {       
         done(null, user);
    } else {
         done(null, false, { message: 'Las contraseña no son iguales' })
    }
}))

passport.use('local-registro', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true

}, async (email, password, done) => {
    const user = await User.findOne({ "local.email" : email });
    if (user) {
       
        return done(null, false, { message: 'Existe un usuario' })
    } else {
        const newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.encryptPassword(password);
        await newUser.save();
        return done(null, newUser);
    }
}))