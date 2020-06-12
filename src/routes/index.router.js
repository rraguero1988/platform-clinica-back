const { Router } = require('express');
const router = Router();

const { routerDashboardGet } = require('../controller/index.controller')

router.get('/', routerDashboardGet);

module.exports = router;