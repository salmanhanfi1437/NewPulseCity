import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Images from '../../assets/images';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import GlobalStyles from "../../styles/GlobalStyles";
import Image from '../../components/atoms/Image';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnBoard'); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Image
        source={Images.Applogo}
        style={GlobalStyles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
      <CustomText
        title={config.appName}
        textStyle={GlobalStyles.mobileText}
      ></CustomText>
    </SafeAreaView>
  );
};



export default SplashScreen;
