const { isAuthenticate } = require('../helpers/auth')
const userModel = require('../models/user.model')

const userController = {};

userController.routerLoginGet = (req, res) => {
    if (isNotAuthenticate)
        res.json('Login de la aplicacion')
}

userController.routerRegistroGet = (req, res) => {
    res.json('Registro de la aplicacion')
}

userController.routerSalirGet = (req, res) => {
    req.logOut();
    res.redirect('/')
}

userController.routerPerfilGet = (req, res) => {
    if (isAuthenticate)
        res.json(req.user);
}

userController.routerUsuarioGet = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await userModel.findOne({ _id });
        res.json(user);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error",
            error
        })
    }
}
userController.routerUsuariosGet = async (req, res) => {
    try {
        const usuarios = await userModel.find();
        res.json(usuarios);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error",
            error
        })
    }
}
module.exports = userController