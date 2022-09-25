import { useFlexSelector } from "@twilio/flex-ui";

const MapView = ({ selectedTaskSid }) => {
  const whatsappTaskLocations = useFlexSelector(
    (state) =>
      state.flex?.view?.componentViewStates?.["whatsapp-task-locations"]
  );

  const location =
    whatsappTaskLocations && whatsappTaskLocations[selectedTaskSid];

  if (!location) return null;

  return (
    <iframe
      key="crmIframe"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.FLEX_APP_GOOGLE_MAPS_EMBED_API_KEY}&q=${location.Latitude}%2C${location.Longitude}`}
      style={{ height: "100vh", margin: "10px" }}
    />
  );
};

export default MapView;
