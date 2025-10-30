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
  IconColor?: string ;
}

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
  IconColor = Colors.white ,
}) => {
  return (
    <View
      style={[
        GlobalStyles.headercontainer,
        { backgroundColor },
        containerStyle,
      ]}
    >
      <StatusBar
        barStyle="default"
        translucent={true}
        backgroundColor="transparent"
      />

      <View style={[GlobalStyles.row, GlobalStyles.viewCenter]}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBackPress}
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
