import React, { useEffect,useRef  } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import GlobalStyles from "../../styles/GlobalStyles";
import { Animated } from 'react-native';
import { screenHeight } from '../../utils/dimensions';
import FontStyles from '../../styles/FontStyles';
import { login, notifications, verifyIdentity, yourCart } from '../../types/constants';


type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList,'Splash'>;

const SplashScreen = () => {
  const letters = ['Z', 'U', 'V', 'Y'];
  const navigation = useNavigation<SplashScreenNavigationProp>();

   useEffect(() => {
    const timer = setTimeout(() => {
      //navigation.replace('ChooseLanguage'); 
      navigation.replace(notifications); 
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  // Start letters fully off screen
  const animations = useRef([
    new Animated.Value(-screenHeight), // Z from top
    new Animated.Value(screenHeight),  // U from bottom
    new Animated.Value(-screenHeight), // V from top
    new Animated.Value(screenHeight),  // Y from bottom
  ]).current;

 useEffect(() => {
    const animationsSequence = letters.map((_, index) =>
      Animated.timing(animations[index], {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    );

    Animated.sequence(animationsSequence).start();
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.container,GlobalStyles.viewCenter]}>
      <Animated.View style={GlobalStyles.viewRow}>
        {letters.map((char, index) => (
          <Animated.Text
            key={index}
            style={[FontStyles.zuvyLetters, {
              transform: [{ translateY: animations[index] }],
            }]}
          >
            {char}
          </Animated.Text>
        ))}
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreen;
