import React, { useEffect, useState } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import HeaderWithBackButton from '../../components/atoms/HeaderWithBackButton';
import {
  alltimesupport,
  analyticDashboard,
  buynow,
  const_totalAmount,
  instantCode,
  itemTotal,
  minus,
  notifications,
  oneyearvalidity,
  plus,
  pricebreakdown,
  quantity,
  securePayment,
  subTotal,
  total,
  verifyIdentity,
  whatincluded,
  yourCart,
} from '../../types/constants';
import { CheckOutDetailProps } from '../../navigation/types';
import Header from '../../components/atoms/Header';
import { useTranslation } from 'react-i18next';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../styles/GlobalStyles';
import {
  fontColor,
  mb,
  ml,
  mt,
  textColor,
  textIncludedStyle,
  fS,
  height,
  paddingH,
  fontW,
  pl,
} from '../../utils/spaces';
import Card from '../../components/atoms/Card';
import LinearGradient from '../../components/atoms/LinearGradient';
import { Colors } from '../../styles';
import {
  CartSVG,
  MinusSVG,
  PlusSVG,
  PriceBreakDownSVG,
  QRCodeSVG,
  TickWhiteSVG,
} from '../../assets/svg';
import { CustomText } from '../../components/atoms/Text';
import FontStyles from '../../styles/FontStyles';
import PressableOpacity from '../../components/atoms/PressableOpacity';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import CustomButton from '../../components/atoms/CustomButton';
import HeaderComponent from '../../components/atoms/HeaderComponent';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import CardContainer from '../../components/atoms/CardContainer';
import CustomTextInput from '../../components/atoms/TextInput';
import config from '../config';
import CartStyles from '../YourCartScreen/styles';

const CheckOutDetail = ({ navigation }: CheckOutDetailProps) => {
  const { t } = useTranslation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <BlueWhiteBackground
      headerHeight={90}
      BlueWhiteBackgroundStyle={{ backgroundColor: colors.white }}
    >
      <HeaderComponent
        showBack={true}
        IconColor={GlobalStyles.blackcolor.color}
        title={config.CheckOutDetailsScreen.title}
        onBackPress={handleBackPress}
        titleStyle={[
          GlobalStyles.headertitle,
          GlobalStyles.blackcolor,
          fontW('600'),
          fS(16),
        ]}
        containerStyle={[
          GlobalStyles.Full_widthLine,
          {
            paddingBottom: GlobalStyles.margin_top10.marginTop,
          },
        ]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ backgroundColor: colors.white }]}
      >
        <CardContainer style={[getShadowWithElevation(1), paddingH(20)]}>
          <CustomText
            title={config.Profile.fullname}
            textStyle={[GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput placeholder={''} value={'Zuvy user'} />
          </ViewOutlined>

          <CustomText
            title={config.CheckOutDetailsScreen.panCard}
            textStyle={[GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput placeholder={'e.g. ABCDE1234F'} value={''} />
          </ViewOutlined>
          <View style={[GlobalStyles.viewRow]}>
            <CustomText
              title={config.CheckOutDetailsScreen.gstNo}
              textStyle={[GlobalStyles.margin_top10]}
            />
            <CustomText
              title={config.CheckOutDetailsScreen.optional}
              textStyle={[
                GlobalStyles.greyColorText,
                GlobalStyles.margin_top10,
              ]}
            />
          </View>
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput placeholder={'e.g. 22AAAAA0000A1Z5'} value={''} />
          </ViewOutlined>
          <View style={[GlobalStyles.viewRow]}>
            <CustomText
              title={config.CheckOutDetailsScreen.legalCoName}
              textStyle={[GlobalStyles.margin_top10]}
            />
            <CustomText
              title={config.CheckOutDetailsScreen.optional}
              textStyle={[
                GlobalStyles.greyColorText,
                GlobalStyles.margin_top10,
              ]}
            />
          </View>
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput placeholder={'Your company name'} value={''} />
          </ViewOutlined>
          <CustomText
            title={config.CheckOutDetailsScreen.Address}
            textStyle={[GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
                height: GlobalStyles.playGradientBox.height,
              },
            ]}
          >
            <CustomTextInput placeholder={''} multiline />
          </ViewOutlined>
        </CardContainer>
        <View style={[CartStyles.totalView]}>
          <View
            style={[
              CartStyles.viewSubTotal,
              GlobalStyles.ZuvyDashBoardContainer,
              mt(2),
            ]}
          >
            <CustomText
              title={const_totalAmount}
              textStyle={[
                CartStyles.itemTotalText,
                fS(13),
                textColor(colors.grey),
              ]}
            />
            <CustomText
              title={`₹1,800.00`}
              textStyle={[
                FontStyles.headingText,
                fontColor(Colors.primaryColor),
                fontW('600'),
                fS(16),
              ]}
            />
          </View>
          <CustomButton
            leftIcon={<CartSVG />}
            title={config.CheckOutDetailsScreen.Proceed}
            textStyles={[fS(14), pl(5)]}
            onPress={() => navigation.navigate('merchantTabs')}
            buttonStyle={[
              GlobalStyles.ZuvyDashBoardContainer,
              mb(0),
              GlobalStyles.containerPaddings,
            ]}
          />

          <CustomText
            title={securePayment}
            textStyle={[
              CartStyles.itemTotalText,
              GlobalStyles.containerPaddings,
              mb(10),
              fS(12),
              textColor(colors.grey),
            ]}
          />
        </View>
      </ScrollView>
    </BlueWhiteBackground>
  );
};

export default React.memo(CheckOutDetail);
