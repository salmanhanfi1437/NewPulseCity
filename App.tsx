import React,{useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
//import RNScreenshotPrevent from 'react-native-screenshot-prevent';
import RootNavigator from './app/navigation';
import { store } from './app/redux/store';
import { NotificationService } from './app/services/notification';
import { RootState } from './app/redux/rootReducer';
import { Modal, StyleSheet, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import AnimatedLoader from 'react-native-animated-loader';


const GlobalLoader = () => {
  const loading = useSelector((state: RootState) => state.loader.loading);

  if (!loading) return null;

  return (
    <Modal transparent animationType="fade" visible={loading}>
      <View style={styles.container}>
        <AnimatedLoader
          visible
          overlayColor="rgba(255,255,255,0.25)"
          source={require('./app/assets/lottie/loader.json')}
          animationStyle={styles.lottie}
          speed={1}/>
      </View>
    </Modal>
  );
};


const App = () => {

  useEffect(() => {
    NotificationService.requestUserPermission();
    NotificationService.listenForMessages();
  }, []);



  return(
    
    <Provider store={store}>   {/* ✅ Wrap your app in Redux Provider */}
    <RootNavigator/>
    <GlobalLoader/> 
    </Provider>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  lottie: {
    width: ms(200),
    height: ms(200),
  },
});
export default App;