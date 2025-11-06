import React, { ReactNode } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { Colors } from '../../../styles';
import ViewRounded10 from '../ViewRounded10';

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  viewStyle?: StyleProp<ViewStyle> | ViewStyle[];
  image?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  disabledBtn?:boolean
};

const Button = ({
  title,
  onPress,
  disabled,
  viewStyle,
  image,
  titleStyle,
  disabledBtn
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabledBtn}>
      <ViewRounded10
        title={title}
        titleStyle={[styles.loginText, titleStyle]}
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
    fontWeight: '500',
    alignSelf: 'center',
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
