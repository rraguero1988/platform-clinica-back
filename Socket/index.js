module.exports = (io)=>{

io.on('connection', socket => {

    io.on('newUser', usuario => {
        console.log(usuario)
    })
})

}