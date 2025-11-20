import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { ms, mvs } from 'react-native-size-matters';

const rnBiometrics = new ReactNativeBiometrics(); 

const BiometricLoginScreen: React.FC<any> = ({ navigation }) => {
  const [biometryType, setBiometryType] = useState<string | null>(null);

  useEffect(() => {
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;
        if (available) {
          setBiometryType(biometryType);
        } else {
          setBiometryType(null);
        }
      })
      .catch(() => setBiometryType(null));
  }, []);

  const handleAuth = async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm your identity',
      });

      if (success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Authentication failed');
      }
    } catch (e) {
      Alert.alert('Biometric error', String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to City Pulse</Text>

      {biometryType ? (
        <Button title={`Login with ${biometryType}`} onPress={handleAuth} />
      ) : (
        <>
          <Text>No biometric available on this device.</Text>
          <View style={{ height: 10 }} />
          <Button title="Continue (Mock login)" onPress={() => navigation.replace('Home')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: mvs(15)
 },
  title: { 
    fontSize: ms(20),
     fontWeight: '700',
      marginBottom: mvs(15) 
    },
});

export default BiometricLoginScreen;