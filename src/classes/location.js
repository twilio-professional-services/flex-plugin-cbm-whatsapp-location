import moment from "moment";

class Location {
  constructor(Timestamp, Latitude, Longitude, Label, Address, ProfileName) {
    this.Timestamp = Timestamp;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.Label = Label;
    this.Address = Address;
    this.ProfileName = ProfileName;
  }

  get UpdatedRelativeTime() {
    return moment(this.Timestamp).fromNow();
  }

  get Valid() {
    return !!this.Latitude && !!this.Longitude;
  }

  get GoogleMapsLatLng() {
    if (this.Valid) {
      return { lat: Number(this.Latitude), lng: Number(this.Longitude) };
    } else {
      return null;
    }
  }
}

export const locationFromSyncDoc = (syncDoc) => {
  const { Latitude, Longitude, Label, Address, ProfileName } = syncDoc.data;
  return new Location(syncDoc.dateUpdated, Latitude, Longitude, Label, Address, ProfileName);
};

export default Location;
