import { useFlexSelector } from "@twilio/flex-ui";
import {
  subscribeWhatsAppMapComponentViewState,
  IncomingLocation,
} from "../../helpers/whatsAppMapComponentViewState";

const MapView = ({ selectedTaskSid }) => {
  const whatsappTaskLocations =
    subscribeWhatsAppMapComponentViewState(selectedTaskSid);
  const incomingLocation = whatsappTaskLocations[IncomingLocation];

  if (!incomingLocation || !incomingLocation.Valid) return null;

  return (
    <iframe
      key="crmIframe"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.FLEX_APP_GOOGLE_MAPS_API_KEY}&q=${incomingLocation.Latitude}%2C${incomingLocation.Longitude}`}
      style={{ height: "100vh", margin: "10px" }}
    />
  );
};

export default MapView;
