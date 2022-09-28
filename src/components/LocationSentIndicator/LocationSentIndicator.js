import { Text } from "@twilio-paste/core";
import PlaceIcon from "@material-ui/icons/Place";
import { Container } from "./LocationSentIndicator.Styles";

const LocationSentIndicator = (props) => {
  if (props.message?.source?.attributes?.locationSent) {
    return (
      <Container>
        <Text>Location sent</Text>
        <PlaceIcon />
      </Container>
    );
  }
  return null;
};

export default LocationSentIndicator;
