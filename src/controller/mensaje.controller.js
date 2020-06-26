import mongoose from 'mongoose'
import Mensaje from '../models/mensaje.model'

const mensajeController = {}

mensajeController.getMensajesByUsuarios = async (req,res) => {
   const usuarioE = req.body.usuarioE
   const usuarioR = req.body.usuarioR

   try {
       const mensajes = await Mensaje.aggregate([{$match:{usuarioD:usuarioR}},{$match:{usuarioE: usuarioE}}])
       console.log('o')
       if(!mensajes) return res.send('No hay mensajes')
       res.json(mensajes)
       
   } catch (error) {
        res.status(500).json({
            mensaje:'ocurrio un errorrr',
            error
        })
   }
}

module.exports = mensajeController