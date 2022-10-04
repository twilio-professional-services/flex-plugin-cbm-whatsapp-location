import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import WhatsAppMap from "./components/WhatsAppMap/WhatsAppMap";
import SimpleMap from "./components/Mapview/Mapview";
import InboundLocation from "./components/InboundLocation";
import OutboundLocation from "./components/OutboundLocation";
import LocationSentIndicator from "./components/LocationSentIndicator";
import ProfileNameBubble from "./components/ProfileNameBubble";

// register action handler
import {} from "./actions/sendMessage";
import { MessageBubble } from "@twilio/flex-ui";

const PLUGIN_NAME = "FlexCbmWhatsappLocationPlugin";

export default class FlexCbmWhatsappLocationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    const apiKey = process.env.FLEX_APP_GOOGLE_MAPS_API_KEY; // can be either iframe embed key or API key
    const clickableMap = !!(
      process.env.FLEX_APP_CLICKABLE_MAP &&
      process.env.FLEX_APP_CLICKABLE_MAP.toLowerCase() === "true"
    );

    // panel 2 shows either clickable map or iframe depending on if clickable map is set. If API key support google maps API as well as iframe set clickable map to true
    console.log(process.env.FLEX_APP_CLICKABLE_MAP);
    if (apiKey) {
      if (clickableMap) {
        flex.AgentDesktopView.Panel2.Content.replace(<WhatsAppMap key="map" />);
      } else {
        flex.AgentDesktopView.Panel2.Content.replace(<SimpleMap key="map" />);
      }
    }

    // Show Location Sent by Customer
    flex.MessagingCanvas.Content.add(
      <InboundLocation key="inbound-location" mapToggleOption={clickableMap} />,
      {
        sortOrder: 100, // put the component last but don't align end or it ends up scrollable
      }
    );

    // If click on Google map show the location that will be sent along with the next message
    flex.MessagingCanvas.Content.add(
      <OutboundLocation key="outbound-location" />,
      {
        sortOrder: 0,
      }
    );

    // If we send a message via messaging API tag the agent message sent within conversations so we can show a location was sent
    flex.MessageListItem.Content.add(
      <LocationSentIndicator key="location-sent" />
    );

    flex.MessageBubble.Content.remove('header');
    flex.MessageBubble.Content.add(<ProfileNameBubble key="custom-header" />, { sortOrder: -1 });
  }
}
