import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { login } from "../types/constants";

export const navigationRef = createNavigationContainerRef();

// ✅ Navigate to a route
export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

// ✅ Replace the current route (like navigation.replace)
export function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

// ✅ Reset the stack (clear all history and go to login)
export function resetToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: login as never }],
    });
  }
}
