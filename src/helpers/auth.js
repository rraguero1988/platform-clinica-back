const helper = {}

helper.isAuthenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/iniciar')
}

helper.isAuthenticate = (req, res, next) => {
    if (req.isAuthenticated())
        return res.redirect('/inicio')
    next();
}

module.exports = helper;