const express = require('express');
const cors = require('cors');
const reservasRoutes = require('./routes/reservas.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservas', reservasRoutes);

module.exports = app;