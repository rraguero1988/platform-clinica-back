const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../models/user.model')

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FACEBOOK,
    clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
    callbackURL: process.env.CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
console.log(profile)
    await userModel.findOne({ "facebook.provider_id": profile.id }, async (err, user) => {
        if (err) throw (err);
        if (!err && user != null) {
            return done(null, user);
        }
        const newUser = new userModel();
        newUser.facebook.provider_id = profile.id;
        newUser.facebook.provider = profile.provider;
        newUser.facebook.name = profile.displayName;
        await newUser.save();
        return done(null, user);
    });
}))