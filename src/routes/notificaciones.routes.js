const express = require('express');
const router = express.Router();
const {
  recibirEstadoTwilio,
} = require('../controllers/notificaciones.controller');

router.post('/status', recibirEstadoTwilio);

module.exports = router;