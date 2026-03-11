const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM;
const to = process.env.ADMIN_WHATSAPP_TO;

const client = twilio(accountSid, authToken);

const notificarNuevaReserva = async (reserva) => {
  try {
    const message = await client.messages.create({
      from,
      to,
      contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
      contentVariables: JSON.stringify({
        1: reserva.fecha,
        2: reserva.hora,
      }),
    });

    console.log('WhatsApp enviado correctamente:', message.sid);
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