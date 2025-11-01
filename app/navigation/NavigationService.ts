import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { RootStackParamList } from './types'; // optional if you use typed navigation

export const navigationRef = createNavigationContainerRef<RootStackParamList>();


function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function push(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

function replace(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

function goBack() {
  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

function resetTo(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name, params }],
    });
  }
}

export default {
  navigate,
  push,
  replace,
  goBack,
  resetTo,
};
