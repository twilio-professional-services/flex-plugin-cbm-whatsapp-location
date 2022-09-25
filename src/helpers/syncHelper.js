import { Manager } from "@twilio/flex-ui";
import { SyncClient } from "twilio-sync";

const manager = Manager.getInstance();
export const SYNC_CLIENT = new SyncClient(
  manager.store.getState().flex.session.ssoTokenPayload.token
);

manager.events.addListener("tokenUpdated", () => {
  SYNC_CLIENT.updateToken(
    manager.store.getState().flex.session.ssoTokenPayload.token
  );
});

// helper that listens for add/update to a sync document and calls the callback handler
// callback handler is also called if/when the document item is initially read
export class SyncDocumentSubscription {
  constructor(documentName, callbackHandler) {
    this._document = null;
    this._documentName = documentName;
    this._callbackHandler = callbackHandler;
  }

  _documentChanged = (doc) => {
    this._callbackHandler(doc);
  };

  start = async () => {
    try {
      this._document = await SYNC_CLIENT.document({
        id: this._documentName,
        mode: "open_existing",
      });
    } catch (errror) {
      this._document = await SYNC_CLIENT.document({
        id: this._documentName,
        mode: "create_new",
        ttl: 86400,
        data: {},
      });
    }

    console.log("DEBUG - start", this._document);

    // if data isn't empty pass it to the callback
    if (Object.keys(this._document.data).length !== 0)
      this._documentChanged(this._document);

    this._document.on("updated", (args) =>
      this._documentChanged(this._document)
    );
  };

  stop = () => {
    if (this._document) this._document.close();
  };
}
