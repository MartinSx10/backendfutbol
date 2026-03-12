const express = require('express');
const router = express.Router();

const {
  getReservas,
  getDisponibilidad,
  createReserva,
  updateEstadoReserva,
  deleteReserva,
} = require('../controllers/reservas.controller');

const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/disponibilidad', getDisponibilidad);
router.post('/', createReserva);

router.get('/', verifyToken, getReservas);
router.put('/:id/estado', verifyToken, updateEstadoReserva);
router.delete('/:id', verifyToken, deleteReserva);

module.exports = router;