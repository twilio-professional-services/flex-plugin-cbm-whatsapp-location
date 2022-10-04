exports.handler = async function (context, event, callback) {
  const response = new Twilio.twiml.MessagingResponse()
  const syncServiceSid = context.TWILIO_SYNC_SERVICE_SID || 'default'

  const { To, From } = event
  const { Latitude, Longitude, ProfileName, Address, Label } = event

  const twilioClient = context.getTwilioClient()

  if (From.startsWith('whatsapp:')) {
    const hasLocation = !!(Latitude && Longitude)
    const syncDocName = `${From}-${To}`
    const expirySeconds = 60 * 60 * 24 * 7 //expires in 7 days
    let whatsappData = {
      ProfileName,
      Address: Address || '',
      Label: Label || ''
    }
    let existingDoc

    if (hasLocation) {
      whatsappData = { ...whatsappData, Latitude, Longitude }
    }

    try {
      await twilioClient.sync
        .services(syncServiceSid)
        .documents.list()
        .then(documents => {
          existingDoc = documents.filter(d => d.uniqueName === syncDocName)[0]
        })
    } catch (error) {
      console.log('Error while listing documents:')
      console.log(error)
    }

    try {
      if (existingDoc) {
        const { sid } = existingDoc

        if (hasLocation) {
          await twilioClient.sync
            .services(syncServiceSid)
            .documents(sid)
            .update({
              ttl: expirySeconds,
              data: whatsappData
            })
        }
      } else {
        await twilioClient.sync.services(syncServiceSid).documents.create({
          uniqueName: syncDocName,
          ttl: expirySeconds,
          data: whatsappData
        })
      }
    } catch (error) {
      console.log('An error has occurred:')
      console.log(error)
    }
  }

  console.log(
    context.WHATSAPP_SANDBOX_NUMBER,
    context.WHATSAPP_SANDBOX_HANDLER_URL
  )
  if (
    To === `whatsapp:${context.WHATSAPP_SANDBOX_NUMBER}` &&
    context.WHATSAPP_SANDBOX_HANDLER_URL
  ) {
    const redirectResponse = new Twilio.Response()
    redirectResponse.setStatusCode(302)
    redirectResponse.setHeaders({
      Location: context.WHATSAPP_SANDBOX_HANDLER_URL
    })
    return callback(null, redirectResponse)
  }

  callback(null, response)
}
