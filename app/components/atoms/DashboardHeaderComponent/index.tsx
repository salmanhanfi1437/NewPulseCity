import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ZuvyLogoSVG } from '../../../assets/svg';
import { Colors } from '../../../styles';
import GlobalStyles from '../../../styles/GlobalStyles';

type ZuvyHeaderProps = {
  onProfilePress?: () => void; // ✅ add callback prop
  onNotificationPress?: () => void;
  headerBgColor?: string;
};

const ZuvyHeader: React.FC<ZuvyHeaderProps> = ({
  onProfilePress,
  onNotificationPress,
  headerBgColor = Colors.white,
}) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={headerBgColor}
        barStyle={
          headerBgColor === Colors.white ? 'dark-content' : 'light-content'
        }
      />
      <View
        style={[
          GlobalStyles.zuvyHeaderContainer,
          {
            backgroundColor: headerBgColor,
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight : 50,
          },
        ]}
      >
        <View style={GlobalStyles.zuvyHeaderRow}>
          <ZuvyLogoSVG />

          <View style={GlobalStyles.zuvyRightIcons}>
            <TouchableOpacity
              style={GlobalStyles.zuvyIconBox}
              onPress={onNotificationPress}
            >
              <FontAwesome name="bell" size={20} color={Colors.black} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onProfilePress}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/women/44.jpg',
                }}
                style={GlobalStyles.zuvyProfileImg}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ZuvyHeader;
