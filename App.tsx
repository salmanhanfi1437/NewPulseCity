import React,{useEffect} from 'react';
import {Provider} from 'react-redux';
//import RNScreenshotPrevent from 'react-native-screenshot-prevent';
import RootNavigator from './app/navigation';
import { store } from './app/redux/store';
import { NotificationService } from './app/services/notification';


const App = () => {

  useEffect(() => {
    NotificationService.requestUserPermission();
    NotificationService.listenForMessages();
  }, []);

  return(
        <Provider store={store}>   {/* ✅ Wrap your app in Redux Provider */}
    <RootNavigator/>
    </Provider>
  )
  
}
export default App;