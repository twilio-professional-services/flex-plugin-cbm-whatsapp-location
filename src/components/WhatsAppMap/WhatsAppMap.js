import { useState } from "react";
import { useFlexSelector } from "@twilio/flex-ui";
import { ClickabletMap, Marker } from "./GoogleMap/GoogleMap";
import { subscribeWhatsAppMapComponentViewState } from "../../helpers/whatsAppMapComponentViewState";

const defaultMapCentre = { lat: 37.7923789, lng: -122.3925021 };

const getWhatsAppsMapStateForSelectedChat = () => {
  const selectedTaskSid = useFlexSelector(
    (state) => state.flex?.view?.selectedTaskSid
  );

  return subscribeWhatsAppMapComponentViewState(selectedTaskSid);
};

const WhatsAppMap = () => {
  const clickHandler = (e) => {
    console.log(e, e.latLng.toJSON());
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        latLng: e.latLng,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log(results[0].formatted_address, results[0]);
          }
        }
      }
    );
    updateClickMarkerLocation(e.latLng);
  };

  const [clickMarkerLocation, updateClickMarkerLocation] = useState(null);
  const { IncomingLocation = null, ShowMap = null } =
    getWhatsAppsMapStateForSelectedChat() || {};

  const customersLastSentLocation = IncomingLocation
    ? {
        lat: Number(IncomingLocation.Latitude),
        lng: Number(IncomingLocation.Longitude),
      }
    : null;

  if (!ShowMap) return null;

  const mapCenter = customersLastSentLocation
    ? customersLastSentLocation
    : defaultMapCentre;
  const initialZoom = customersLastSentLocation ? 12 : 10;

  return (
    <ClickabletMap
      initialLocationCenter={mapCenter}
      initialZoom={initialZoom}
      clickHandler={clickHandler}
      apiKey={process.env.FLEX_APP_GOOGLE_MAPS_EMBED_API_KEY}
    >
      {clickMarkerLocation && (
        <Marker key="click-marker" position={clickMarkerLocation} />
      )}
      {customersLastSentLocation && (
        <Marker
          key="inbound-marker"
          position={customersLastSentLocation}
          options={{
            icon: {
              url: "https://maps.gstatic.com/mapfiles/ms2/micons/grn-pushpin.png",
            },
            label: {
              text: "Whatsapp location",
              color: "black",
              fontWeight: "bold",
            },
          }}
        />
      )}
    </ClickabletMap>
  );
};

export default WhatsAppMap;
