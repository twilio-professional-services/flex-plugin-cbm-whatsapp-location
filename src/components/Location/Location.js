import PlaceIcon from "@material-ui/icons/Place";
import { Text, Tooltip, Anchor, Button } from "@twilio-paste/core";
import {
  Container,
  IconDiv,
  SeparatorContainer,
  SeparatorLine,
} from "./Location.Styles";
import { Ticker } from "../Ticker/Ticker";

const LocationIcon = ({ locationAvailable, linkTooltipText, link }) => {
  var iconOpacity = locationAvailable ? 1 : 0.5;

  const icon = (
    <IconDiv>
      <PlaceIcon style={{ fontSize: "36px" }} opacity={iconOpacity} />
    </IconDiv>
  );

  if (locationAvailable)
    return (
      <Tooltip text={linkTooltipText()}>
        <Anchor href={link}>{icon}</Anchor>
      </Tooltip>
    );
  else {
    return icon;
  }
};

const Location = ({ locationAvailable, location }) => {
  const locationContent = () =>
    locationAvailable
      ? `Location updated ${location.UpdatedRelativeTime}`
      : "No location data";

  const link = locationAvailable
    ? `https://www.google.com/maps/search/?api=1&query=${location.Latitude}%2C${location.Longitude}`
    : "";

  const linkTooltipText = () => {
    if (locationAvailable) {
      if (location.Label || location.Address) {
        return `Click to open in google maps... ${location.Label} | ${location.Address}`;
      } else
        return `Click to open in google maps... ${location.Latitude} | ${location.Longitude}`;
    } else {
      return "";
    }
  };

  return (
    <>
      <SeparatorContainer>
        <SeparatorLine />
      </SeparatorContainer>

      <Container>
        <LocationIcon
          locationAvailable={locationAvailable}
          linkTooltipText={linkTooltipText}
          link={link}
        />

        <Ticker tickRate="tick10s">
          {() => <Text>{locationContent()}</Text>}
        </Ticker>
      </Container>
    </>
  );
};

export default Location;
