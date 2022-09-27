import axios from "axios";
import { Manager } from "@twilio/flex-ui";

const sendLocationViaMessagingAP = async (To, From, Lat, Lng) => {
  const manager = Manager.getInstance();

  const payload = {
    To,
    From,
    Lat,
    Lng,
    Token: manager.store.getState().flex.session.ssoTokenPayload.token,
  };

  console.log("DEBUG ***", payload);

  try {
    const response = await axios.post(
      `${process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN}/send-whatsapp-location`,
      payload
    );

    console.log("sendWhatsAppLocation", response.data);
  } catch (error) {
    console.log("sendWhatsAppLocation failed", error), error;
  }
};

export default sendLocationViaMessagingAP;
