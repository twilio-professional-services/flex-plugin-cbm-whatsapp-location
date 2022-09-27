import { Alert, Text } from "@twilio-paste/core";
import {
  OutboundLocation as OutboundLocationKey,
  subscribeWhatsAppMapComponentViewState,
  setWhatsAppMapComponentViewState,
} from "../../helpers/whatsAppMapComponentViewState";
import { Container } from "./OutboundLocation.Styles";

const OutboundLocation = ({ task }) => {
  const onDismiss = () => {
    setWhatsAppMapComponentViewState(task.sid, OutboundLocationKey, {});
  };
  const whatsAppMapDataState = subscribeWhatsAppMapComponentViewState(task.sid);
  const location = whatsAppMapDataState[OutboundLocationKey];

  if (!location || !location.Valid) return null;
  return (
    <Container>
      <Alert onDismiss={() => onDismiss()} variant="neutral">
        <Text as="p">Send location with next message:</Text>
        <Text as="p" fontSize="fontSize20">
          {location.Address}
        </Text>
      </Alert>
    </Container>
  );
};

export default OutboundLocation;
