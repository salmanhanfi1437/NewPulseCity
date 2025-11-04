import React from 'react';
import {
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../../styles/GlobalStyles';
import { CustomText } from '../Text';
import { Colors } from '../../../styles';
import Badge from '../Badge';
import colors from '../../../styles/colors';

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
  BadgeText?: string;
  badgeTextColor?: string;
  isTransparent?: boolean;
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
  BadgeText,
  badgeTextColor,
  isTransparent = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      {isTransparent ? (
        <View
          style={[
            GlobalStyles.Custombutton,
            { backgroundColor: colors.transparent },
            buttonStyle,
          ]}
        >
          <CustomText
            title={title}
            textStyle={[GlobalStyles.buttonText, textStyles]}
          />
        </View>
      ) : (
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
              <Badge text={BadgeText} textcolor={badgeTextColor} />
            )}
            {rightIcon}
          </View>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
