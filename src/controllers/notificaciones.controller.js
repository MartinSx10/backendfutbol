const recibirEstadoTwilio = (req, res) => {
  console.log('Estado Twilio recibido:', {
    messageSid: req.body.MessageSid,
    messageStatus: req.body.MessageStatus,
    errorCode: req.body.ErrorCode,
    to: req.body.To,
  });

  res.sendStatus(200);
};

module.exports = {
  recibirEstadoTwilio,
};