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

  let client;

  try {
    client = twilio(accountSid, authToken);
  } catch (error) {
    console.error('No se pudo inicializar Twilio:', error.message);
    return;
  }

  try {
    const message = await client.messages.create({
      from,
      to,
      contentSid: 'HXa7eb032f2dc2425d5ddcb68db3fdea12',
      contentVariables: JSON.stringify({
        1: reserva.fecha,
        2: reserva.hora,
        3: reserva.nombre,
        4: reserva.telefono,
        5: reserva.estado,
      }),
      statusCallback: 'https//backendfutbol-production.up.railway.app/api/notificaciones/status',
    });

    console.log('Twilio aceptó el mensaje:', message.sid);
  } catch (error) {
    console.error('Error al enviar WhatsApp:', {
      message: error.message,
      code: error.code,
      status: error.status,
      moreInfo: error.moreInfo,
      details: error.details,
    });
  }
};

module.exports = {
  notificarNuevaReserva,
};