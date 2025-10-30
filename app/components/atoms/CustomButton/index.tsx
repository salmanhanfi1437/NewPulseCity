import React from 'react';
import {
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../../styles/GlobalStyles';
import { CustomText } from '../Text';
import { ms } from 'react-native-size-matters';
import config from '../../../screens/config';
import { Colors } from '../../../styles';
import Badge from '../Badge';

type CustomButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle | ViewStyle[];
  textStyles?: TextStyle | TextStyle[];
  gradientColors?: string[];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  commingSoon?: boolean;
  BadgeText? : string

};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  textStyles,
  gradientColors = Colors.zuvyPrimaryGradient,
  leftIcon,
  rightIcon,
  commingSoon = false,
  BadgeText
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 9 }}
        style={[
          GlobalStyles.Custombutton,
          buttonStyle,
          disabled && GlobalStyles.disabledButton,
        ]}
      >
        <View style={GlobalStyles.zuvyRightIcons}>
          {leftIcon}
          <CustomText
            textStyle={[GlobalStyles.buttonText, textStyles]}
            title={title}
          />
          {commingSoon && (
            <Badge text={BadgeText} />
          )}
          {rightIcon}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
