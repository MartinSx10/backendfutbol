const express = require('express');
const cors = require('cors');
const reservasRoutes = require('./routes/reservas.routes');
const authRoutes = require('./routes/auth.routes');
const notificacionesRoutes = require('./routes/notificaciones.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/notificaciones', notificacionesRoutes);

module.exports = app;