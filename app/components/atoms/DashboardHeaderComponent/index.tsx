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
import { CustomText } from '../Text';
import { bgColor, fS } from '../../../utils/spaces';
import { mvs } from 'react-native-size-matters';
import FontStyles from '../../../styles/FontStyles';

type ZuvyHeaderProps = {
  onProfilePress?: () => void; // ✅ add callback prop
  onNotificationPress?: () => void;
  headerBgColor?: string;
  title : string;
};

const ZuvyHeader: React.FC<ZuvyHeaderProps> = ({
  onProfilePress,
  onNotificationPress,
  headerBgColor = Colors.white,
  title
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
             <View style={[GlobalStyles.zuvyProfileImg,GlobalStyles.viewCenter,bgColor(Colors.secondaryColor)]}>
                       <CustomText textStyle={[FontStyles.buttonText,fS(mvs(10))]}  
                       title={title}></CustomText>
                     </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ZuvyHeader;
