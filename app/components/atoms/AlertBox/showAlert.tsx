import { Alert } from 'react-native';

/**
 * 🔔 Common Alert Utility
 * @param title - Optional title (default = "Alert")
 * @param message - The message to show
 * @param onPress - Optional callback for OK button
 */
export const showAlert = (
  message?: string | any,
  title: string = 'Alert',
  onPress?: () => void
) => {
  if (!message) return;

  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress || (() => {}),
      },
    ],
    { cancelable: false }
  );
};
