City Pulse — Local Events Explorer (React Native + TypeScript)
Overview

Starter app for the assessment. Search events (Ticketmaster), view details, favorite events (persisted), toggle LTR/RTL (English/Arabic), biometric login, and map preview.

Setup

Clone and install

npx react-native init CityPulse --template react-native-template-typescript
cd CityPulse
# copy/paste files from above into src/
npm install


Install native packages

npx pod-install ios   # iOS only
# Android: ensure SDK etc. configured


Set Ticketmaster API Key
Open src/config/keys.ts and set:

export const TICKETMASTER_API_KEY = 'PASTE_YOUR_CONSUMER_KEY_HERE';


(Use the Consumer Key visible in your Ticketmaster Developer console. This is the apikey for discovery requests.)

Maps

If you want Google Maps on Android/iOS, add API keys to AndroidManifest.xml / Info.plist and to src/config/keys.ts.

For basic map preview on Android using the JS map view you may still need to configure if you plan to use Google Maps provider; otherwise default works on many setups.

Run

# Start Metro
npm run start

# Android
npm run android

# iOS
npm run ios

Notes & assumptions

Using Consumer Key as Ticketmaster apikey param — this is the public key shown in your Developer Dashboard.

For mobile app type there is no explicit "mobile" option in their app creation; a Web app key (consumer key) works for Discovery API calls from client (respect rate limits). If you need OAuth flows, configure OAuth redirect URIs.

Biometric login is mocked — successful biometric auth routes to Home. Add production auth/secure key storage if required.

Favorites are stored in AsyncStorage under favorites_v1.

RTL change requires app reload to apply fully.

Bonus / Next steps

Add Firebase Auth / Firestore for remote persistence.

Use native secure storage (Keychain / Keystore) for tokens.

Implement offline caching and better error handling.

Final tips & where to put your Ticketmaster keys

The Consumer Key you saw on the Ticketmaster Developer page is the API key you need to pass as the apikey parameter in the REST URL:

https://app.ticketmaster.com/discovery/v2/events.json?apikey=YOUR_CONSUMER_KEY&keyword=rock&city=Dubai


Paste that string into src/config/keys.ts as TICKETMASTER_API_KEY.

If you prefer to keep keys out of source control, use environment variables or react-native-config and set the key in .env. For the assessment a config file as above is fine.