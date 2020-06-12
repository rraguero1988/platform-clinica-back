const mongoose = require('mongoose');

const { MONGODB_HOST, MONGODB_DB } = process.env
const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DB}`

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Conectado a la base de datos'))
    .catch(err => console.error(err))