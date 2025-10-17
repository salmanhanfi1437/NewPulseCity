import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Image,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../styles/colors';
import { ms, mvs } from 'react-native-size-matters';

const SplashScreen = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [listening, setListening] = useState(false);
  const [activeField, setActiveField] = useState<'email' | 'password' | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // 🔒 Ask microphone permission
  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone for voice input.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

 
    


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewColumn}>
        <Text style={styles.title}>🎤 Voice Login (Speech to Text)</Text>

        {/* Email Input */}
        <View style={styles.viewRow}>
          <TextInput
            editable={false}
            style={styles.textInput}
            value={form.email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity>
            <Image
              style={[styles.imgMic, listening && styles.micActive]}
              source={require('../../assets/images/microphone.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Password Input */}
        <View style={[styles.viewRow, styles.margins]}>
          <TextInput
            editable={false}
            style={styles.textInput}
            value={form.password}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity>
            <Image
              style={[styles.imgMic, listening && styles.micActive]}
              source={require('../../assets/images/microphone.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: mvs(10),
    justifyContent: 'center',
  },
  viewColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  viewRow: {
    width: '100%',
    borderWidth: 1,
    borderRadius: mvs(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(20),
    paddingHorizontal: ms(8),
  },
  textInput: {
    flex: 1,
    height: mvs(45),
    fontSize: ms(15),
  },
  imgMic: {
    width: 22,
    height: 22,
    marginRight: ms(5),
    tintColor: '#444',
  },
  micActive: {
    tintColor: 'red',
  },
  title: {
    fontSize: ms(16),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: mvs(15),
  },
  margins: {
    marginTop: mvs(10),
  },
});

export default SplashScreen;