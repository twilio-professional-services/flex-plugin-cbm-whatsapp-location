import { styled } from "@twilio/flex-ui";

export const Container = styled("div")`
  display: flex;
  justify-content: right;
  margin-bottom: 15px;
  ${(props) => props.theme.Chat.WelcomeMessage.Container}
`;
