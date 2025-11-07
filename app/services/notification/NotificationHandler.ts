import { NavigationContainerRef } from '@react-navigation/native';

class NotificationHandler {
  private navigationRef: NavigationContainerRef<any> | null = null;

  setNavigation(ref: NavigationContainerRef<any>) {
    this.navigationRef = ref;
  }

  handleNotificationOpen(data: any) {
    console.log('🔗 Notification clicked with data:', data);

    if (data?.screen && this.navigationRef) {
      this.navigationRef.navigate(data.screen, data.params);
    }
  }
}

export default new NotificationHandler();
