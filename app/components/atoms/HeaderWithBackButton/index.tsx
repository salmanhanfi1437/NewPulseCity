import React from 'react';
import { View } from 'native-base';
import GlobalStyles from '../../../styles/GlobalStyles';
import { bgColor, ml, pl, pr } from '../../../utils/spaces';
import { BackSVG } from '../../../assets/svg';
import { CustomText } from '../Text';
import FontStyles from '../../../styles/FontStyles';

import { mvs } from 'react-native-size-matters';
import { ViewStyle, TouchableOpacity } from 'react-native';

type HeaderWithBackButtonProps = {
  title?: string;
  onPress?: () => void;
  styles?: ViewStyle | ViewStyle[];
};

const HeaderWithBackButton = ({
  title,
  onPress,
  styles,
}: HeaderWithBackButtonProps) => {
  return (
    <View style={[GlobalStyles.headerView, pl(mvs(10)), pr(mvs(10))]}>
      <View pointerEvents="box-none" style={[GlobalStyles.positionAbsoulute,GlobalStyles.viewCenter]}>

      <TouchableOpacity
      
        style={[GlobalStyles.positionAbsoulute, pl(mvs(10))]}
        onPress={onPress}>
        <BackSVG />
      </TouchableOpacity>
      </View>
      <CustomText
        title={title}
        textStyle={[FontStyles.headingText, GlobalStyles.textAlign]}
      />
    </View>
  );
};

export default React.memo(HeaderWithBackButton);
