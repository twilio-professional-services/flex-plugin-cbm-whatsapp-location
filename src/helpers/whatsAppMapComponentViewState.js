import { Actions, Manager, useFlexSelector } from "@twilio/flex-ui";

export const IncomingLocation = "IncomingLocation";
export const ShowMap = "ShowMap";
const componentViewName = "WhatsAppMapData";
const manager = Manager.getInstance();

export const setWhatsAppMapComponentViewState = (sid, key, value) => {
  const previousState =
    manager.store.getState().flex.view.componentViewStates?.[
      componentViewName
    ]?.[sid];
  Actions.invokeAction("SetComponentState", {
    name: componentViewName,
    state: { [sid]: { ...previousState, [key]: value } },
  });
};

export const subscribeWhatsAppMapComponentViewState = (sid) => {
  return useFlexSelector(
    (state) =>
      state.flex?.view?.componentViewStates?.[componentViewName]?.[sid] || {}
  );
};
