const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM;
const to = process.env.ADMIN_WHATSAPP_TO;

const client =
  accountSid && authToken ? twilio(accountSid, authToken) : null;

const notificarNuevaReserva = async (reserva) => {
  if (!accountSid || !authToken || !from || !to) {
    console.log('Faltan variables de entorno para WhatsApp');
    return;
  }

  if (!client) {
    console.log('No se pudo inicializar Twilio');
    return;
  }

  const body =
    `Nueva reserva creada\n` +
    `Fecha: ${reserva.fecha}\n` +
    `Hora: ${reserva.hora}\n` +
    `Nombre: ${reserva.nombre}\n` +
    `Teléfono: ${reserva.telefono}\n` +
    `Estado: ${reserva.estado}`;

  try {
    const message = await client.messages.create({
      from,
      to,
      body,
    });

    console.log('WhatsApp enviado correctamente:', message.sid);
  } catch (error) {
    console.error('Error al enviar WhatsApp:', error.message);
  }
};

module.exports = {
  notificarNuevaReserva,
};