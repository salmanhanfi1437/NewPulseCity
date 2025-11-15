import React from 'react';
import { View } from 'native-base';
import GlobalStyles from '../../../styles/GlobalStyles';
import { CustomText } from '../Text';
import FontStyles from '../../../styles/FontStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { mvs } from 'react-native-size-matters';
import { ViewStyle, TouchableOpacity } from 'react-native';
import colors from '../../../styles/colors';
import { pl, pr } from '../../../utils/spaces';

type HeaderWithBackButtonProps = {
  title?: string;
  onPress?: () => void;
  styles?: ViewStyle | ViewStyle[];
};
const HeaderWithBackButton = ({ title, onPress, styles }: HeaderWithBackButtonProps) => {
  return (
    <View style={[GlobalStyles.headerView, pl(mvs(10)), pr(mvs(10))]}>

      <TouchableOpacity
        style={{ position: 'absolute', left: mvs(10), zIndex: 10 }}  
        onPress={onPress}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <FontAwesome6 name="arrow-left" size={20} color={colors.black} />
      </TouchableOpacity>

      <CustomText
        title={title}
        textStyle={[FontStyles.headingText, GlobalStyles.textAlign]}
      />
    </View>
  );
};


export default React.memo(HeaderWithBackButton);
