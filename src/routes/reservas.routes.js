const express = require('express');
const router = express.Router();

const {
  getReservas,
  createReserva,
  updateEstadoReserva,
  deleteReserva,
} = require('../controllers/reservas.controller');

router.get('/', getReservas);
router.post('/', createReserva);
router.put('/:id/estado', updateEstadoReserva);
router.delete('/:id', deleteReserva);

module.exports = router;