import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SchemaMensaje = new Schema({
    mensaje:{type:String,required:true},
    usuarioD:{type:String,required:true},
    usuarioE:{type:String,required:true}
})

module.exports = mongoose.model('Mensaje',SchemaMensaje)