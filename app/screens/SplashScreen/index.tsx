import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import GlobalStyles from '../../styles/GlobalStyles';
import { ZuvyLogo } from '../../assets/svg';
import { ms, mvs } from 'react-native-size-matters';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // Fade-in animation for logo
  const imageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: mvs(1500),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
     navigation.replace("ChooseLanguage");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={[GlobalStyles.container, GlobalStyles.viewCenter]}>
      <Animated.View style={{ opacity: imageOpacity }}>
        <ZuvyLogo width={ms(180)} height={ms(180)} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreen;
