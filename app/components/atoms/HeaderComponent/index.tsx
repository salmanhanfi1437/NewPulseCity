import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ViewStyle,
  TextStyle,
} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import colors from '../../../styles/colors';
import { Colors } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
interface HeaderProps {
  title?: string;
  onBackPress?: () => void;
  rightIcon?: boolean;
  rightIconType?: 'fontawesome6' | 'evil'; //
  onRightPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  showBack?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  IconColor?: string;
}

// ✅ Utility to determine light or dark background
const isColorDark = (color: string) => {
  if (!color) return false;
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // formula for luminance
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

const Header: React.FC<HeaderProps> = ({
  title = '',
  onBackPress,
  rightIcon,
  rightIconType = 'fontawesome6',
  onRightPress,
  backgroundColor = 'transparent',
  textColor = '#000',
  showBack = true,
  containerStyle,
  titleStyle,
  IconColor = Colors.white,
}) => {
  const navigation = useNavigation<any>();
  const barStyle = isColorDark(backgroundColor)
    ? 'light-content'
    : 'dark-content';
  const finalTextColor =
    textColor || (isColorDark(backgroundColor) ? '#fff' : '#000');
  const finalIconColor = IconColor || finalTextColor;
  return (
    <View
      style={[
        GlobalStyles.headercontainer,
        containerStyle,
      ]}
    >
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={barStyle}
      />

      <View style={[GlobalStyles.row, GlobalStyles.viewCenter]}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={GlobalStyles.iconButton}
          >
            <FontAwesome6 name="arrow-left" size={20} color={IconColor} />
          </TouchableOpacity>
        ) : (
          <View style={GlobalStyles.placeholder} />
        )}

        <Text
          style={[GlobalStyles.headertitle, { color: textColor }, titleStyle]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {rightIcon ? (
          <TouchableOpacity
            onPress={onRightPress}
            style={GlobalStyles.iconButton}
          >
            <FontAwesome6
              name="ellipsis-vertical"
              size={20}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <View style={GlobalStyles.placeholder} />
        )}
      </View>
    </View>
  );
};

export default React.memo(Header);
