const passport = require("passport");

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require('../models/user.model');

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        await userModel.findOne({ "google.provider_id": profile.id }, async (err, user) => {
            if (err) throw (err);
            if (!err && user != null) {
                return done(null, user);
            }
            const newUser = new userModel();
            newUser.google.provider_id = profile.id,
            newUser.google.provider = profile.provider,
            newUser.google.name = profile.name.givenName + ' ' + profile.name.familyName
            await newUser.save();
            return done(null, user);
        });
    }
));