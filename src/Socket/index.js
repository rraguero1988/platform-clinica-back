import mongoose from 'mongoose'
import User from '../models/user.model'
import Mensaje from '../models/mensaje.model'

module.exports = (io)=>{
    let users = []
    let messages = []


io.on('connection', socket => {

    socket.on('newUser', async usuario => {
      
        console.log(`${usuario} se ha conectado`)
       // console.log(usuario)
        const user = await User.findOne({'local.usuario':usuario})
        //console.log(user)
        user.socket = socket.id
        await user.save()
        socket.username = usuario
        users = await User.find({'local.online':true})
        messages = await Mensaje.find()
        io.emit('userOnline', {
         usuarios: users.map(s => s.local.usuario),
         mensajes:messages
     })
        })

        socket.on('buscarMensaje', async usuario => {
          const mensajes = await Mensaje.aggregate([{$match:{'usuarioD':{$in:[socket.username,usuario]}}},{$match:{'usuarioE':{$in:[socket.username,usuario]}}}])
          if(mensajes){
            io.to(socket.id).emit('buscarMensaje',mensajes)
          }
        
        })

        socket.on('msg', msg => {
            let message = new Mensaje({
              mensaje:msg.mensaje,
              usuarioD:msg.usuario,
              usuarioE:socket.username
            })
            const user = users.find(s => s.local.usuario === msg.usuario)
            message.save()
            if(user.socket != ''){
              io.to(user.socket).emit('msg',message)
            }
              io.to(socket.id).emit('msg',message)
          
        })
        socket.on('disconnect', async ()=>{
            //const usuario = await User.findOne({socket:socket.id})
             console.log(`${socket.username} se desconecto`)
             io.emit('salio',socket.username)
             if(socket.username){
             const usuario = await User.findOne({'local.usuario':socket.username})
             if(usuario){
             usuario.local.online = false
             usuario.socket = ''
             const user = users.findIndex(s => s.socket === socket.id)
             socket.disconnect(true)
             users.splice(user,1)
             await usuario.save()
             }
          }
             
             
         })
})

}