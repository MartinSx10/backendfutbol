const notificarNuevaReserva = async (reserva) => {
  console.log('Nueva reserva creada:', {
    id: reserva.id,
    fecha: reserva.fecha,
    hora: reserva.hora,
    nombre: reserva.nombre,
    telefono: reserva.telefono,
    estado: reserva.estado,
  });
};

module.exports = {
  notificarNuevaReserva,
};