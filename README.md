# WhatsApp Location Flex UI Plugin

This Plugin handles customers sending a location from WhatsApp and shows agent the customer location in Flex UI. It also optionally supports agents clicking a location in Google Maps in agent desktop panel 2 and sending the location to the customer.

## Disclaimer

**This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.**

# Overview
Twilio WhatsApp support sending and receiving of location using [Programmable Messaging webhooks and APIs](https://support.twilio.com/hc/en-us/articles/360052128874-Can-I-share-my-location-or-receive-location-information-on-WhatsApp-) 

At the time of writing Twilio Conversations which is used by Flex for Conversations Based Message doesn't pass location data.

This plugin and serverless webhook handler allows inbound location data to be stored in Twilio Sync and made available to Flex UI as well as supporting sending location data outside of conversations using the Programmable Messaging APIs.

The plugin can optionally make use of Google Maps API keys to display the incoming location in a Google Maps iframe or a Google Maps React component that allows the agent to click a location to reply to the customer with.

![Demo](./screenshots/video.gif)

## Google Maps API
The plugin can operate in the following 'modes'
+ Click to open a google maps page in another window and don't use Agent Desktop Panel 2. (No API key required) 
+ Use Agent Desktop Panel 2 with iframe of Google Maps - no sending of location to customer supported. ([Google Maps Embed API required](https://developers.google.com/maps/documentation/embed/get-started))
+ Use Agent Desktop Panel 2 with React Google Maps allowing agent to select a location to send. ([Google Maps API required](https://developers.google.com/maps/documentation/javascript/get-api-key))

Note a google account linked to billing may be required and you should investigate how much free developer usage is available from Google before making use of the plugin.

## Implementation

Inbound Messaging Webhooks are checked for the Lat/Long parameters and if present a Sync Document is updated with the customers location. The plugin will subscribe to the Sync Document that has a unique name matching the "Customer Number-Twilio Number".

For Outbound Location messages we make a request from the plugin to a serverless function which makes use of the Messaging API to send a message with no body but includes location data.
As this message is sent outside of the context of Conversations we update the message attribute of the previous message in Conversations with a flag indicating a location was sent and we use this attribute to provide a visual that a location was sent.


# SETUP

## Deploy Serverless

If support for receiving messages on a WhatsApp Sandbox number is required update the .env.template and copy to .env. The url would be the url you configured in [these steps](https://www.twilio.com/docs/flex/admin-guide/setup/conversations/manage-conversations-whatsapp-addresses#configuring-whatsapp-sandbox)

(For Sandbox support we will modify the url configured in the console after serverless deployment)

```
WHATSAPP_SANDBOX_HANDLER_URL=
WHATSAPP_SANDBOX_NUMBER=+14155238886
```

Deploy the [Twilo Serverless functions](https://www.twilio.com/docs/labs/serverless-toolkit/developing) and note the newly created domain.

## Twilio Console
Navigate to Twilio Console -> Messaging -> Services -> Default Messaging Service for Conversations -> Integration and set the Incoming Messages -> Send Webhook to be the deployed serverless domain/incoming-msg-handler.

This step ensure that as well as the expected conversations integration with Flex to create new channels, send webhooks to studio and populate the channel with messages it will also create/update a Sync Doc with Location data.

### Sandbox
For Sandbox support you should also modify Twilio Console -> Messaging -> Settings -> WhatsApp sandbox settings -> When a Message Comes in to poin to the serverless domain/incoming-msg-handler.

Note the incoming-msg-handler endpoint will detect that it is a messgae for the sandbox and after checing updating Sync it will redirect to run the required Sandbox logic for Conversation creation.

## Deploy Plugin
Update the plugins .env.template and copy to .env

```
FLEX_APP_GOOGLE_MAPS_API_KEY=
FLEX_APP_CLICKABLE_MAP=true
FLEX_APP_TWILIO_SERVERLESS_DOMAIN=
```
The Google Maps API key options are described above and if the key isn't limited to embedding google maps in iframes you can set clickable map to true to allow a more feature rich map which supports outbound location messages.

The serverless domain would be the serverless domain created in the previous step and is required so the plugin can send a request to ceate a Message with location data.
