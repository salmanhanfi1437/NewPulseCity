import React, { ReactNode } from 'react';
import { Animated, Pressable, PressableProps } from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

interface CustomPressableOpacityProps extends PressableProps {
  children?: ReactNode;
}

const PressableOpacity = ({ children, onPress, onLongPress, delayLongPress, style }: CustomPressableOpacityProps) => {
  const scale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
      // style={GlobalStyles.fullwidth} // ✅ this allows full width
    >
      <Animated.View style={{ transform: [{ scale }], width: '100%' }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(PressableOpacity);