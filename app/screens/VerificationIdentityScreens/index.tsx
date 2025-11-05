import React from 'react';
import { View } from 'react-native';
import BackgroundPrimaryColor from '../../components/atoms/BackgroundPrimaryColor';
import {
  completeKYC,
  contactSupport,
  kycompleted,
  learnMore,
  needHelp,
  proceedDigiLocker,
  protectAccount,
  rbi_norms,
  verifyIdentity,
  verifyIdentitySecurely,
  whykyc,
} from '../../types/constants';
import { DigiLockerSVG, TickCircleSVG, VerifyKYCSVG } from '../../assets/svg';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../styles/GlobalStyles';
import {
  fontColor,
  fS,
  ml,
  mt,
  pl,
  bR,
  marginVertical,
  bgColor,
  pb,
  padding,
  height,
} from '../../utils/spaces';
import { CustomText } from '../../components/atoms/Text';
import FontStyles from '../../styles/FontStyles';
import Card from '../../components/atoms/Card';
import { ms, mvs } from 'react-native-size-matters';
import { Colors } from '../../styles';
import Button from '../../components/atoms/Button';
import { verifyIdentityProps } from '../../navigation/types';
import colors from '../../styles/colors';

const VerificationIdentity = ({ navigation }: verifyIdentityProps) => {
  const handleDigilockerPress = () => {
    navigation.replace(kycompleted);
  };

  const { paddingBottom, ...restStyles } =
    GlobalStyles.ZuvyDashBoardScrollContent;

  return (
    <BackgroundPrimaryColor
      title={verifyIdentity}
      subTitle={completeKYC}
      div={true}
      KeyboardAwareScrollViewStyles={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <View style={[GlobalStyles.viewCenter, mt(20), bgColor(Colors.white)]}>
        <VerifyKYCSVG
          height={ms(120)}
          style={[
            marginVertical(20),
            { borderWidth: 0, borderColor: Colors.transparent },
          ]}
        />

        <Card style={[mt(10), GlobalStyles.width50, getShadowWithElevation(1)]}>
          <CustomText
            title={whykyc}
            textStyle={[FontStyles.buttonText, { textAlign: 'center' }, pb(20)]}
          />
          <View style={[restStyles]}>
            <View style={[GlobalStyles.viewRow]}>
              <TickCircleSVG />

              <CustomText
                title={verifyIdentitySecurely}
                textStyle={[
                  ml(5),
                  FontStyles.subText,
                  fontColor(Colors.grey),
                  fS(11),
                ]}
              />
            </View>

            <View style={[GlobalStyles.viewRow, mt(15)]}>
              <TickCircleSVG />

              <CustomText
                title={protectAccount}
                textStyle={[
                  GlobalStyles.viewCenter,
                  ml(5),
                  fontColor(Colors.grey),
                  fS(11),
                ]}
              />
            </View>

            <View style={[GlobalStyles.viewRow, mt(15)]}>
              <TickCircleSVG />

              <CustomText
                title={rbi_norms}
                textStyle={[
                  GlobalStyles.viewCenter,
                  ml(5),
                  fontColor(Colors.grey),
                  fS(11),
                ]}
              />
            </View>

            <CustomText
              title={learnMore}
              textStyle={[
                GlobalStyles.viewCenter,
                mt(10),
                FontStyles.headingText,
                fontColor(Colors.primaryColor),
                GlobalStyles.textAlign,
              ]}
            />
          </View>
        </Card>

        <View style={GlobalStyles.fullwidth}>
          <Button
            onPress={handleDigilockerPress}
            image={<DigiLockerSVG />}
            title={proceedDigiLocker}
            titleStyle={[fS(ms(14)), fontColor(colors.black), pl(10)]}
            viewStyle={[
              GlobalStyles.Custombutton,
              mt(20),
              bR(15),
              GlobalStyles.viewRow,
              padding(15),
              getShadowWithElevation(1),
              height(60),
            ]}
          />
        </View>

        <View style={[GlobalStyles.viewRow, GlobalStyles.viewCenter, mt(10)]}>
          <CustomText
            title={needHelp}
            textStyle={[FontStyles.subText, fontColor(Colors.color_6B7280)]}
          />
          <CustomText
            title={contactSupport}
            textStyle={[
              FontStyles.subText,
              fontColor(Colors.color_6B7280),
              ml(2),
            ]}
            underline={true}
          />
        </View>
      </View>
    </BackgroundPrimaryColor>
  );
};

export default React.memo(VerificationIdentity);
