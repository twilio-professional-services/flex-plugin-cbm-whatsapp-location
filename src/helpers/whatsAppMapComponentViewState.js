import { Actions, Manager, useFlexSelector } from "@twilio/flex-ui";
const manager = Manager.getInstance();

// keys
export const IncomingLocation = "IncomingLocation";
export const OutboundLocation = "OutboundLocation";
export const ShowMap = "ShowMap";

// component view namespace
const componentViewName = "WhatsAppMapData";

export const setWhatsAppMapComponentViewState = (sid, key, value) => {
  const previousState =
    manager.store.getState().flex.view.componentViewStates?.[
      componentViewName
    ]?.[sid];
  console.log(previousState, sid, key, value);
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

export const getWhatsAppMapComponentViewState = (sid) => {
  return manager.store.getState().flex?.view?.componentViewStates?.[
    componentViewName
  ]?.[sid];
};
