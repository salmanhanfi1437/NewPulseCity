import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import { CustomText } from '../Text';

type CustomButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        GlobalStyles.Custombutton,
        buttonStyle,
        disabled && GlobalStyles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <CustomText textStyle={[GlobalStyles.buttonText, textStyle]} title={title} />
    </TouchableOpacity>
  );
};

export default CustomButton;
