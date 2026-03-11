const db = require('../config/db');
const { notificarNuevaReserva } = require('../services/notificaciones.service');

const getReservas = (req, res) => {
  const { fecha } = req.query;

  let query = 'SELECT * FROM reservas';
  const params = [];

  if (fecha) {
    query += ' WHERE fecha = ?';
    params.push(fecha);
  }

  query += ' ORDER BY fecha ASC, hora ASC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener reservas' });
    }

    res.json(rows);
  });
};

const createReserva = (req, res) => {
  const { fecha, hora, nombre, telefono, estado } = req.body;

  if (!fecha || !hora || !nombre || !telefono || !estado) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  db.get(
    `SELECT * FROM reservas WHERE fecha = ? AND hora = ? AND estado != 'cancelado'`,
    [fecha, hora],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error al validar reserva' });
      }

      if (row) {
        return res.status(409).json({ error: 'Ese horario ya está reservado' });
      }

      db.run(
        `INSERT INTO reservas (fecha, hora, nombre, telefono, estado)
         VALUES (?, ?, ?, ?, ?)`,
        [fecha, hora, nombre, telefono, estado],
        function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error al crear reserva' });
          }

          const nuevaReserva = {
            id: this.lastID,
            fecha,
            hora,
            nombre,
            telefono,
            estado,
          };

          notificarNuevaReserva(nuevaReserva);

          res.status(201).json(nuevaReserva);
        }
      );
    }
  );
};

const updateEstadoReserva = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['reservado', 'pagado', 'cancelado'];

  if (!estado || !estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  db.run(
    'UPDATE reservas SET estado = ? WHERE id = ?',
    [estado, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar estado' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      res.json({ message: 'Estado actualizado correctamente' });
    }
  );
};

const deleteReserva = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM reservas WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar reserva' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json({ message: 'Reserva eliminada correctamente' });
  });
};

module.exports = {
  getReservas,
  createReserva,
  updateEstadoReserva,
  deleteReserva,
};