/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';


async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('✅ Notification permission granted');
    } else {
      Alert.alert('Permission denied', 'You won’t receive notifications.');
      console.log('❌ Notification permission denied');
    }
  } else {
    console.log('✅ Android version < 13, no need to request permission');
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('FCM permission enabled:', authStatus);
    getFcmToken();
  }
}


// Background & quit-state FCM handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📬 Background message received:', remoteMessage);
  const { title, body } = remoteMessage.notification || {};

  PushNotification.localNotification({
    channelId: "default-channel-id", // must exist
    title: title || "Zuvy Store",
    message: body || "New notification received",
  });
});


AppRegistry.registerComponent(appName, () => App);
