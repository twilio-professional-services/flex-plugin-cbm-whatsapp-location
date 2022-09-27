import { Text } from "@twilio-paste/core";
import PlaceIcon from "@material-ui/icons/Place";

const LocationSentIndicator = (props) => {
  if (props.message?.source?.attributes?.locationSent) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginBottom: "15px",
        }}
      >
        <Text>Location sent</Text>
        <PlaceIcon />
      </div>
    );
  }
  return null;
};

export default LocationSentIndicator;
