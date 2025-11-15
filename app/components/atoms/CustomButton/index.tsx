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
  height?: number;
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
  height,
}) => {
  return (
    <View>
      {isTransparent ? (
        <View
          style={[
            GlobalStyles.Custombutton,
            { backgroundColor: colors.transparent },
            height !== undefined ? { height } : {},
            buttonStyle,
          ]}
        >
          <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={GlobalStyles.zuvyRightIcons}>
              {leftIcon}
              <CustomText
                title={title}
                textStyle={[GlobalStyles.buttonText, textStyles]}
              />
              {rightIcon}
            </View>
          </TouchableOpacity>
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
            height !== undefined ? { height } : {},
          ]}
        >
          <TouchableOpacity onPress={onPress} disabled={disabled}>
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
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
};

export default CustomButton;
