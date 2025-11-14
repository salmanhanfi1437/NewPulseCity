import { Alert } from 'react-native';

/**
 * 🔔 Common Alert Utility with Optional Negative Button
 *
 * @param message   - Message to display (required)
 * @param title     - Optional title (default = "Alert")
 * @param onPositive - Callback for OK button
 * @param negativeText - Optional negative button text (e.g., "Cancel")
 * @param onNegative - Optional callback for negative button
 */
export const showAlert = (
  message?: string | any,
  title: string = 'Alert',
  onPositive?: () => void,
  negativeText?: string,      // 👈 if provided, show negative button
  onNegative?: () => void
) => {
  if (!message) return;

  const buttons: any[] = [
    {
      text: 'OK',
      onPress: onPositive || (() => {}),
    },
  ];

  // 👉 Add negative button only when user passes the text
  if (negativeText) {
    buttons.unshift({
      text: negativeText,
      style: 'cancel',
      onPress: onNegative || (() => {}),
    });
  }

  Alert.alert(title, message, buttons, { cancelable: false });
};
