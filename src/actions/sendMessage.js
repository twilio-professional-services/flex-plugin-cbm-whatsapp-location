import { Actions, TaskHelper } from "@twilio/flex-ui";
import {
  getWhatsAppMapComponentViewState,
  setWhatsAppMapComponentViewState,
  OutboundLocation,
} from "../helpers/whatsAppMapComponentViewState";
import sendLocationViaMessagingAPI from "../helpers/sendLocationViaMessagingAPI";

// check in the store if there is an outbound location waiting to be sent
const handleBeforeSendMessage = (payload) => {
  const task = TaskHelper.getTaskFromConversationSid(payload?.conversationSid);

  if (!task) return;

  const whatsAppMapComponentViewState = getWhatsAppMapComponentViewState(
    task.sid
  );
  const outboundLocation = whatsAppMapComponentViewState?.[OutboundLocation];

  if (!outboundLocation || !outboundLocation.Valid) return;

  // We have a valid message waiting in the store to send.
  // + Send the location via messaging API
  // + Update this messages attributes so we can show in the UI a location was sent
  // + Clear the location from the store so it clears from UI and map Marker

  const external_contact = `whatsapp:${task?.attributes?.conversations?.external_contact}`;
  const from = task?.attributes?.customerAddress;

  payload.messageAttributes = {
    ...payload.messageAttributes,
    locationSent: true,
  };
  setWhatsAppMapComponentViewState(task.sid, OutboundLocation, null);
  sendLocationViaMessagingAPI(
    from,
    external_contact,
    outboundLocation.Latitude,
    outboundLocation.Longitude
  );
};

Actions.addListener("beforeSendMessage", (payload) => {
  handleBeforeSendMessage(payload);
});
