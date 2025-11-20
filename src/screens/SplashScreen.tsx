import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';
import { globalStyles } from '../styles';

const SplashScreen: React.FC<any> = ({ navigation }) => {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('BiometricLogin');
    }, 500);

    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Pulse</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:mvs(1), 
    justifyContent:'center', 
    alignItems:'center'
},
  title: {
   ...globalStyles.title,
    marginBottom:mvs(15)
}
});

export default React.memo(SplashScreen);
