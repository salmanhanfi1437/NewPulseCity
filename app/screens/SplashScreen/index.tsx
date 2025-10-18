import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography } from '../../styles';
import FastImage from 'react-native-fast-image';
import Images from '../../assets/images';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import { ms, mvs } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnBoard'); 
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        source={Images.Applogo}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
      <CustomText
        title={config.appName}
        textStyle={styles.mobileText}
      ></CustomText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  logo: {
    width: 160,
    height: 260,
  },
  mobileText: {
    fontSize: ms(18),
    color: Colors.white,
    marginTop: mvs(-25),
    fontFamily: 'Poppins-Bold',
  },
});

export default SplashScreen;
