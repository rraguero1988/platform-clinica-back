const { Router } = require('express');
const router = Router();

const { getMensajesByUsuarios } = require('../controller/mensaje.controller')


router.post('/mensajesUser', getMensajesByUsuarios)

module.exports = router


