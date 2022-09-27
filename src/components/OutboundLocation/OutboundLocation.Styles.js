import { styled } from "@twilio/flex-ui";

export const Container = styled("div")`
  padding-left: 3%;
  padding-right: 3%;

  ${(props) => props.theme.Chat.WelcomeMessage.Container}
`;
