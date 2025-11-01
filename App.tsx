import React,{useEffect} from 'react';
import {Provider} from 'react-redux';
//import RNScreenshotPrevent from 'react-native-screenshot-prevent';
import RootNavigator from './app/navigation';
import { store } from './app/redux/store';


const App = () => {

  useEffect(() =>{

    //RNScreenshotPrevent.enabled(true); // Enable ScreenShot blocking

    return () =>{

      //RNScreenshotPrevent.enabled(false); // Disable when unmout
    }

  },[])

  return(
        <Provider store={store}>   {/* ✅ Wrap your app in Redux Provider */}
    <RootNavigator/>
    </Provider>
  )
  
}
export default App;