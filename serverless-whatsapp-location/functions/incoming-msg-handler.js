exports.handler = async function (context, event, callback) {
  const response = new Twilio.twiml.MessagingResponse();
  const syncServiceSid = context.TWILIO_SYNC_SERVICE_SID || "default";

  const { To, From } = event;
  const { Latitude, Longitude, ProfileName, Address, Label } = event;

  const twilioClient = context.getTwilioClient();

  if (From.startsWith("whatsapp:") && Latitude && Longitude) {
    const syncDocName = `${From}-${To}`;
    const expirySeconds = 60 * 60 * 24 * 7; //expires in 7 days
    const locationData = {
      Latitude,
      Longitude,
      ProfileName: ProfileName || "",
      Address: Address || "",
      Label: Label || "",
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

  callback(null, response);
};
