import { useEffect, useState } from "react";
import { Actions, TaskHelper } from "@twilio/flex-ui";
import Location from "./Location";
import { SyncDocumentSubscription } from "../../helpers/syncHelper";
import { locationFromSyncDoc } from "../../classes/location";

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
  const locationUpdated = (location) => {
    updateLocalStateLocation(location);
    if (task.sid) {
      Actions.invokeAction("SetComponentState", {
        name: "whatsapp-task-locations",
        state: { [task.sid]: location },
      });
    }
  };
  const [location, updateLocalStateLocation] = useState(null);
  const task = TaskHelper.getTaskFromConversationSid(sid);

  var locationKey = locationKeyFromTaskAttributes(task);

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
    return <Location locationAvailable={true} location={location} />;
  else return <Location locationAvailable={false} />;
};

export default LocationContainer;
