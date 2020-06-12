const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    local:{
        email: { type: String, unique: true,  lowercase: true },
        password: { type: String  },
        nombre: { type: String },
        apellido: { type: String }
    },
    facebook:{
        name: String,
        provider: String,
        provider_id: {type: String, unique: true},
        createdAt: {type: Date, default: Date.now}
    },
    google:{
        name: String,
        provider: String,
        provider_id: {type: String, unique: true},
        createdAt: {type: Date, default: Date.now}
    }
   
})
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
userSchema.methods.comparePassword = (password, user) => {
    return bcrypt.compareSync(password, user.local.password);
}
module.exports = model('user', userSchema);