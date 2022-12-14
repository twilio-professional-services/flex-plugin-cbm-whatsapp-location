import { withTheme, styled } from "@twilio/flex-ui";

export const Container = styled("div")`
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 5px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;

  ${(props) => props.theme.Chat.WelcomeMessage.Container}
`;

export const SeparatorContainer = styled("div")`
  padding-left: 3%;
  padding-right: 3%;
`;

export const IconDiv = styled("div")`
  margin-bottom: 4px;
  margin-right: 5px;
  height: 36px;
  width: 36px;
  align-self: center;
  ${(props) => props.theme.Chat.WelcomeMessage.Icon};
`;

export const SeparatorLine = styled("hr")`
  flex: 1 1 1px;
  ${(props) => props.theme.Chat.MessageList.DateSeparatorLine};
`;
