exports.handler = async function (context, event, callback) {
  const response = new Twilio.twiml.MessagingResponse();
  const syncServiceSid = context.TWILIO_SYNC_SERVICE_SID || "default";

  const { To, From } = event;
  const { Latitude, Longitude, ProfileName, Address, Label } = event;

  const twilioClient = context.getTwilioClient();

    if (
      From.startsWith('whatsapp:') &&
      (ProfileName || (Latitude && Longitude))
    ) {
      const syncDocName = `${From}-${To}`
      const expirySeconds = 60 * 60 * 24 * 7; //expires in 7 days
      const locationData = {
        Latitude: Latitude || '',
        Longitude: Longitude || '',
        ProfileName: ProfileName || '',
        Address: Address || '',
        Label: Label || ''
      };

    try {
      await twilioClient.sync
        .services(syncServiceSid)
        .documents(syncDocName)
        .update({
          ttl: expirySeconds,
          data: locationData,
        });
    } catch (error) {
      console.error("add sync item");
      await twilioClient.sync.services(syncServiceSid).documents.create({
        uniqueName: syncDocName,
        ttl: expirySeconds,
        data: locationData,
      });
    }
  }
  console.log(
    context.WHATSAPP_SANDBOX_NUMBER,
    context.WHATSAPP_SANDBOX_HANDLER_URL
  );
  if (
    To === `whatsapp:${context.WHATSAPP_SANDBOX_NUMBER}` &&
    context.WHATSAPP_SANDBOX_HANDLER_URL
  ) {
    const redirectResponse = new Twilio.Response();
    redirectResponse.setStatusCode(302);
    redirectResponse.setHeaders({
      Location: context.WHATSAPP_SANDBOX_HANDLER_URL,
    });
    return callback(null, redirectResponse);
  }

  callback(null, response);
};
