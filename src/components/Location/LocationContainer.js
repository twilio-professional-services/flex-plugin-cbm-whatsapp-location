import { useEffect, useState } from "react";
import { TaskHelper } from "@twilio/flex-ui";
import Location from "./Location";
import { SyncDocumentSubscription } from "../../helpers/syncHelper";
import { locationFromSyncDoc } from "../../classes/location";
import {
  setWhatsAppMapComponentViewState,
  subscribeWhatsAppMapComponentViewState,
  IncomingLocation,
  ShowMap,
} from "../../helpers/whatsAppMapComponentViewState";

// returns customerNumber-twilioNumber string
const locationKeyFromTaskAttributes = (task) => {
  if (task?.attributes?.channelType !== "whatsapp") return null;

  const external_contact = `whatsapp:${task?.attributes?.conversations?.external_contact}`;
  const from = task?.attributes?.from;

  if (from && task?.attributes?.conversations?.external_contact) {
    const key = `${from}-${external_contact}`;
    console.log("checking for location data for key", key);
    return key;
  } else {
    console.log("Check task attributes. Unable to build key for location data");
    return "";
  }
};

const LocationContainer = ({ sid }) => {
  // helper methods
  const handleToggleMapIconClick = () => {
    setWhatsAppMapComponentViewState(task.sid, ShowMap, !showMap);
  };

  const locationUpdated = (location) => {
    console.log("locationUpdated", location);
    if (task.sid) {
      setWhatsAppMapComponentViewState(task.sid, IncomingLocation, location); //updates state for map panel
      setWhatsAppMapComponentViewState(task.sid, ShowMap, true);
    }
  };

  const task = TaskHelper.getTaskFromConversationSid(sid);
  var locationKey = locationKeyFromTaskAttributes(task);

  // state from store
  const whatsAppMapDataState = subscribeWhatsAppMapComponentViewState(task.sid);
  const location = whatsAppMapDataState[IncomingLocation];
  const showMap = whatsAppMapDataState[ShowMap];

  // subscribe to sync doc and update component view state on location change
  useEffect(() => {
    const syncDocumentSubscription = new SyncDocumentSubscription(
      locationKey,
      (documentData) => locationUpdated(locationFromSyncDoc(documentData))
    );
    if (locationKey) syncDocumentSubscription.start();

    return function cleanup() {
      syncDocumentSubscription.stop();
    };
  }, []);

  if (task?.attributes?.channelType !== "whatsapp") return null;

  if (location && location.Valid)
    return (
      <Location
        locationAvailable={true}
        location={location}
        showMap={showMap}
        showToggleMapIcon={true}
        handleToggleMapIconClick={handleToggleMapIconClick}
      />
    );
  else
    return (
      <Location
        locationAvailable={false}
        showMap={showMap}
        showToggleMapIcon={true}
        handleToggleMapIconClick={handleToggleMapIconClick}
      />
    );
};

export default LocationContainer;
