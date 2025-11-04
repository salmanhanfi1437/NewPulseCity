import React, { ReactNode } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { Colors, } from '../../../styles';
import ViewRounded10 from '../ViewRounded10';

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  viewStyle?: StyleProp<ViewStyle> | ViewStyle[];
  image?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
};

const Button = ({
  title,
  onPress,
  disabled,
  viewStyle,
  image,
  titleStyle
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <ViewRounded10
        title={title}
        titleStyle={[styles.loginText,titleStyle]}
        containerStyle={[styles.btnLogin, viewStyle]}
        image={image}
        disabled={disabled}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loginText: {
    fontSize: ms(20),
    color: Colors.white,
    fontWeight: '700',
    alignSelf: 'center',
    letterSpacing: ms(1),
  },
  btnLogin: {
    color: Colors.primaryColor,
    alignSelf: 'center',
    backgroundColor: Colors.primaryColor,
    width: '100%',
    alignItems: 'center',
  },
});

export default React.memo(Button);
