import { useState } from "react";
import { withTaskContext } from "@twilio/flex-ui";
import { ClickabletMap, Marker } from "./GoogleMap/GoogleMap";
import Location from "../../classes/location";
import {
  subscribeWhatsAppMapComponentViewState,
  setWhatsAppMapComponentViewState,
  OutboundLocation,
} from "../../helpers/whatsAppMapComponentViewState";

const defaultMapCentre = { lat: 37.7923789, lng: -122.3925021 };

const updateWhatsAppMapComponentViewState = (taskSid, latLng) => {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      latLng,
    },
    function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (taskSid && results[0]) {
          console.log("geocode", results);
          console.log("geocode", results[0].formatted_address);
          const latLngJson = latLng.toJSON();
          setWhatsAppMapComponentViewState(
            taskSid,
            OutboundLocation,
            new Location(
              new Date(),
              latLngJson.lat.toString(),
              latLngJson.lng.toString(),
              "Outbound WhatsApp Location",
              results[0].formatted_address
            )
          );
        }
      }
    }
  );
};

const WhatsAppMap = ({ task }) => {
  const clickHandler = (e) => {
    console.log(e, e.latLng.toJSON());
    updateWhatsAppMapComponentViewState(task.sid, e.latLng);
  };

  const {
    IncomingLocation = null,
    ShowMap = null,
    OutboundLocation,
  } = subscribeWhatsAppMapComponentViewState(task?.sid) || {};

  const customersLastSentLocation = IncomingLocation
    ? IncomingLocation.GoogleMapsLatLng
    : null;
  const clickMarkerLocation = OutboundLocation
    ? OutboundLocation.GoogleMapsLatLng
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

export default withTaskContext(WhatsAppMap);
