import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationService {
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('✅ Notification permission granted.');
      this.getFcmToken();
    } else {
      console.log('🚫 Notification permission denied.');
    }
  }

  async getFcmToken() {
    try {
      const token = await messaging().getToken();
      console.log('🎯 FCM Token:', token);
      // send token to your backend here if needed
    } catch (error) {
      console.log('❌ Failed to get FCM token:', error);
    }
  }

  listenForMessages() {
    // Foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('📩 Foreground message:', remoteMessage);

      // Show a local notification when the app is open
      PushNotification.localNotification({
                channelId: 'default-channel-id',
  id: Date.now(), // unique ID for each notification
        title: remoteMessage.notification?.title || 'New Message',
        message: remoteMessage.notification?.body || '',
      });

      Alert.alert(remoteMessage.notification?.title ?? '', remoteMessage.notification?.body ?? '');
    });

    // Background messages handled in index.js (separate)
  }
}

export default new NotificationService();
