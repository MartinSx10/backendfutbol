const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM;
const to = process.env.ADMIN_WHATSAPP_TO;

const notificarNuevaReserva = async (reserva) => {
  if (!accountSid || !authToken || !from || !to) {
    console.log('Faltan variables de entorno para WhatsApp');
    return;
  }

  if (!accountSid.startsWith('AC')) {
    console.log('TWILIO_ACCOUNT_SID inválido. Debe comenzar con AC');
    return;
  }

  let client;

  try {
    client = twilio(accountSid, authToken);
  } catch (error) {
    console.error('No se pudo inicializar Twilio:', error.message);
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