const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const client = context.getTwilioClient();
  const response = new Twilio.Response();

  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const { To, From, Lat, Lng } = event;

    const message = await client.messages.create({
      from: From,
      body: " ",
      persistentAction: [`geo:${Lat},${Lng}`],
      to: To,
    });

    response.appendHeader("Content-Type", "application/json");
    response.setBody({ result: true, messageSid: message.sid });
    return callback(null, response);
  } catch (err) {
    returnError(callback, response, err.message);
  }
});

const returnError = (callback, response, errorString) => {
  console.error(errorString);
  response.appendHeader("Content-Type", "plain/text");
  response.setBody(errorString);
  response.setStatusCode(500);
  return callback(null, response);
};
