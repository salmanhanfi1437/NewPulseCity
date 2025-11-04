import React from 'react';
import { View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import {
  bgColor,
  fontColor,
  mt,
  pl,
  pr,
  ml,
  fS,
  Top,
} from '../../utils/spaces';
import { Colors } from '../../styles';
import { KYCompletedSVG } from '../../assets/svg';
import { CustomText } from '../../components/atoms/Text';
import {
  backToDashboard,
  const_kyc_completed,
  thankuKYC,
} from '../../types/constants';
import FontStyles from '../../styles/FontStyles';
import Button from '../../components/atoms/Button';
import { kycompletedProps } from '../../navigation/types';
import colors from '../../styles/colors';

const VerificationCompleted = ({ navigation }: kycompletedProps) => {
  return (
    <View
      style={[
        GlobalStyles.flexOne,
        bgColor(Colors.white),
        GlobalStyles.viewCenter,
        pl(15),
        pr(15),
      ]}
    >
      <KYCompletedSVG />

      <CustomText
        title={const_kyc_completed}
        textStyle={[FontStyles.headingText, mt(20)]}
      />

      <CustomText
        title={thankuKYC}
        textStyle={[FontStyles.subText, mt(30), GlobalStyles.textAlign, fS(12)]}
      />

      <View style={[GlobalStyles.fullwidth, GlobalStyles.bottomButton]}>
        <Button
          onPress={() => navigation.replace('merchantTabs')}
          viewStyle={[
            Top('70%'),
            GlobalStyles.viewRow,
            GlobalStyles.viewCenter,
            GlobalStyles.Custombutton,
          ]}
          titleStyle={[ml(10), fS(14), fontColor(colors.black)]}
          title={backToDashboard}
        />
      </View>
    </View>
  );
};

export default React.memo(VerificationCompleted);
