import React, { Children, ReactElement } from 'react';
import { Animated,Pressable,PressableProps,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import useAnimation from '../../../hooks/useAnimation';

interface CustomPressableOpacityProps extends PressableProps {

    children? : ReactElement;
    onPress?: () => void;
    onLongPress?: () => void; //Optional Long press handler
    delayLongPress?: number; //optional delay for long press
}

const PressableOpacity = ({children,onPress,onLongPress,delayLongPress} : CustomPressableOpacityProps) =>{

    const {fadeIn,fadeOut,opacityValue} = useAnimation();

    return (
        <Pressable
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onLongPress={onLongPress}
        onPress={onPress}>

        {children}
        <Animated.View style = {styles(opacityValue).animationEffect}/>
        </Pressable>
    );
};

const styles = (opacityValue) =>
    StyleSheet.create({
        animationEffect: {
          opacity: opacityValue,
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  flex: 1,
  backgroundColor: 'white',
        },
    });

PressableOpacity.propTypes = {
    children: PropTypes.node.isRequired,
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func,
    delayLongPress: PropTypes.number,
};

export default React.memo(PressableOpacity);