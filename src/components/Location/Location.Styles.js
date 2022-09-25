import { withTheme, styled } from "@twilio/flex-ui";

export const Container = styled("div")`
  padding-left: 3%;
  padding-right: 3.75%;
  padding-top: 10px;
  margin-right: auto;
  padding-bottom: 20px;
  display: flex;
  align-items: center;

  ${(props) => props.theme.Chat.WelcomeMessage.Container}
`;

export const SeparatorContainer = styled("div")`
  padding-left: 3%;
  padding-right: 3.75%;
`;

export const IconDiv = styled("div")`
  margin-bottom: 4px;
  margin-right: 10px;
  height: 36px;
  width: 36px;
  align-self: center;
  ${(props) => props.theme.Chat.WelcomeMessage.Icon};
`;

export const SeparatorLine = styled("hr")`
  flex: 1 1 1px;
  ${(props) => props.theme.Chat.MessageList.DateSeparatorLine};
`;
