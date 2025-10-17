import React,{useEffect} from 'react';
import {Provider} from 'react-redux';
//import RNScreenshotPrevent from 'react-native-screenshot-prevent';
import RootNavigator from './app/navigation';


const App = () => {

  useEffect(() =>{

    //RNScreenshotPrevent.enabled(true); // Enable ScreenShot blocking

    return () =>{

      //RNScreenshotPrevent.enabled(false); // Disable when unmout
    }

  },[])

  return(
    <RootNavigator/>
  )
  
}
export default App;