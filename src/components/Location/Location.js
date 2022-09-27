import PlaceIcon from "@material-ui/icons/Place";
import MapIcon from "@material-ui/icons/Map";

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

const ToggleMapIcon = ({ showMap }) => {
  const opacity = showMap ? 1 : 0.5;
  return (
    <IconDiv>
      <MapIcon
        style={{ fontSize: "36px" }}
        opacity={opacity}
        title="Toggle Map"
      />
    </IconDiv>
  );
};

const Location = ({
  locationAvailable,
  location,
  showToggleMapIcon,
  showMap,
  handleToggleMapIconClick,
}) => {
  const locationContent = () =>
    locationAvailable
      ? `Incoming location updated ${location.UpdatedRelativeTime}`
      : "No incoming location data";

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
        <Button variant="secondary_icon">
          <LocationIcon
            locationAvailable={locationAvailable}
            linkTooltipText={linkTooltipText}
            link={link}
          />
        </Button>

        <Ticker tickRate="tick10s">
          {() => <Text style={{ width: "100%" }}>{locationContent()}</Text>}
        </Ticker>

        {showToggleMapIcon && (
          <Tooltip text="Toggle Map">
            <Button
              variant="secondary_icon"
              size="circle"
              pressed="true"
              onClick={() => handleToggleMapIconClick()}
            >
              <ToggleMapIcon showMap={showMap} />
            </Button>
          </Tooltip>
        )}
      </Container>
    </>
  );
};

export default Location;
