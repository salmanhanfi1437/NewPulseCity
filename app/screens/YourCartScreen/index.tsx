import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import HeaderWithBackButton from '../../components/atoms/HeaderWithBackButton';
import {
  alltimesupport,
  analyticDashboard,
  buynow,
  const_active_support_team,
  const_RESET_STORE,
  const_totalAmount,
  const_youwillearn,
  gst,
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
  whatincluded,
  yourCart,
} from '../../types/constants';
import { yourCartProps } from '../../navigation/types';
import Header from '../../components/atoms/Header';
import { useTranslation } from 'react-i18next';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../styles/GlobalStyles';
import {
  bgColor,
  fontColor,
  fontW,
  fS,
  height,
  mb,
  ml,
  mr,
  mt,
  padding,
  paddingH,
  pb,
  pl,
  pr,
  textColor,
  textIncludedStyle,
  width,
} from '../../utils/spaces';
import Card from '../../components/atoms/Card';
import LinearGradient from '../../components/atoms/LinearGradient';
import { Colors, Typography } from '../../styles';
import {
  ActiviteSupportSVG,
  CartSVG,
  DigiLockerSVG,
  MinusSVG,
  PlusSVG,
  PriceBreakDownSVG,
  QRCodeSVG,
  RupeeSVG,
  SecurePaymentSVG,
  TickWhiteSVG,
} from '../../assets/svg';
import { CustomText } from '../../components/atoms/Text';
import FontStyles from '../../styles/FontStyles';
import PressableOpacity from '../../components/atoms/PressableOpacity';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import CartStyles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/atoms/Button';
import VerificationIdentityScreens from '../VerificationIdentityScreens';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import {
  MasterQrRequest,
  OrderQrRequest,
  ResetOrderData,
} from './yourCartSlice';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import colors from '../../styles/colors';
import HeaderComponent from '../../components/atoms/HeaderComponent';
import CustomButton from '../../components/atoms/CustomButton';
import { ms, mvs } from 'react-native-size-matters';
import { Flex } from 'native-base';
import RazorpayCheckout from 'react-native-razorpay';
import config from '../config';
import { ProfileRequest } from '../UserProfile/profileSlice';
import {
  ResetRazorPay,
  VerifyRazorPayRequest,
} from '../CheckoutDetails/checkoutSlice';
import TextInput from '../../components/atoms/TextInput';
import { screenWidth } from '../../utils/dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { includesArray } from '../../utils/helper';

const YourCart = ({ navigation }: yourCartProps) => {
  const { t } = useTranslation();

  const [qty, setQty] = useState(1);
  const [gstAmount, setGSTAmout] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [earningAmount, setEarningAmount] = useState(0);
  const dispatch = useDispatch();

  const { error, mastertQrData } = useSelector(
    (state: RootState) => state.masterQr,
  );
  const { qrCodeError, orderQrData } = useSelector(
    (state: RootState) => state.masterQr,
  );
  const { profileData, error: profileError } = useSelector(
    (state: RootState) => state.profile,
  );
  const { verifyRazaorPay_data, verifyRazaorPay_error } = useSelector(
    (state: RootState) => state.verifyRazorPayment,
  );

  useEffect(() => {
    if (mastertQrData || error) {
      if (mastertQrData) {
      } else {
        console.log('MasterQrError ' + error);
      }
    }
  }, [mastertQrData, error]);

  useEffect(() => {
    if (orderQrData) {
      console.log('OrderData ' + JSON.stringify(orderQrData));
      if (orderQrData?.success) {
        handleCheckout();
        dispatch(ResetOrderData());
      }
    } else {
      showAlert(qrCodeError?.message);
    }
  }, [qrCodeError, orderQrData]);

  useEffect(() => {
    if (verifyRazaorPay_data || verifyRazaorPay_error) {
      console.log('VerifyRaz' + JSON.stringify(verifyRazaorPay_data));
      if (verifyRazaorPay_data?.success) {
        dispatch(ResetOrderData());
        dispatch(ResetRazorPay());
        navigation.replace('merchantTabs');
      }
    } else {
      showAlert(verifyRazaorPay_error?.message);
    }
  }, [verifyRazaorPay_data, verifyRazaorPay_error]);

  useEffect(() => {
    dispatch(MasterQrRequest());
  }, []);

  useEffect(() => {
    const totalPrice = qty * mastertQrData?.data?.perUnitPrice;
    const gstPrice = totalPrice * (mastertQrData?.data?.gst / 100);
    setGSTAmout(gstPrice);

    const totalAmount = Number(totalPrice) + gstPrice;
    setTotalAmount(totalAmount);

    // ✅ Calculate earning amount (20% of total amount)
    const total = mastertQrData?.data?.perUnitPrice * qty;
    const thirtyThreePercent = total * 0.33;
    setEarningAmount(thirtyThreePercent)
  }, [qty, mastertQrData]);

  const handleBackPress = () => {
    navigation.goBack()
  };

  const updateQty = (type: 'plus' | 'minus') => {
    setQty(prev => {
      if (type === 'plus') {
        return Math.min(prev + 1, 999); // max cap
      } else {
        return Math.max(prev - 1, 1); // min cap
      }
    });
  };

  useEffect(() => {
    if (profileData) {
      if (profileData?.success) {
      }
    } else {
      showAlert(profileError?.message);
    }
  }, [profileData, profileError]);

  const handleCheckout = () => {
    // order data
    const orderData = orderQrData?.data;
    // 🔹 Check condition
    if (mastertQrData?.data?.hasCheckoutDetails === false) {
      // Navigate to checkout detail screen
      navigation.navigate('CheckOutDetail', { data: orderData });
    } else {
      // Open Razorpay directly
      const options: any = {
        description:
          mastertQrData?.data?.description || 'Payment for QR Package',
        image: config.zuvyBlueLogoforRazarPay,
        currency: orderData?.currency,
        key: config.RazarPayLiveKey,
        amount: parseInt(orderData.amount) * 100, // convert to paise
        order_id: orderData?.razorpayOrderId,
        prefill: {
          email: profileData?.data?.email,
          contact: profileData?.data?.mobile,
          name: profileData?.data?.name,
        },
        theme: { color: colors.white },
      };
      console.log("options "+JSON.stringify(options));
      RazorpayCheckout.open(options)
        .then(data => {
          console.log('Payment success', data);
          dispatch(
            VerifyRazorPayRequest({
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id,
              razorpay_signature: data.razorpay_signature,
            }),
          );
        })
        .catch(error => {
          console.log('Payment failed', error);
          if (error?.error?.reason === 'payment_cancelled') {
            Alert.alert('Cancelled', 'You cancelled the payment.');
          } else {
            Alert.alert('Error', 'Payment failed.');
          }
        });
    }
  };

  useEffect(() => {
    dispatch(ProfileRequest());
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.flexOne]}>
    <HeaderWithBackButton
      title={yourCart}
      onPress={handleBackPress}/>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ backgroundColor: colors.color_F9FAFB }]}
      >
        <View style={[GlobalStyles.topParentView]}>
          <Card style={[getShadowWithElevation(1)]}>
            <View style={[GlobalStyles.viewRow]}>
              <LinearGradient
                style={CartStyles.viewLinearGradient}
                colors={[Colors.color_FFD51C, Colors.primaryColor]}>
                <QRCodeSVG />
              </LinearGradient>

              <View style={[ml(10), GlobalStyles.flexOne]}>
                <CustomText
                  title={mastertQrData?.data?.qrName}
                  textStyle={[FontStyles.headingText]}/>
                
                <CustomText
                  title={mastertQrData?.data?.description}
                  textStyle={[
                    Typography.style.smallTextU(),
                    textColor(colors.fadeTextColor),
                    pb(10),
                  ]}
                />
                <View
                  style={[GlobalStyles.viewRow, GlobalStyles.viewRight]}>
                  <CustomText
                    title={`₹${mastertQrData?.data?.perUnitPrice}`}
                    textStyle={[
                      FontStyles.headingText,
                      fontW('600'),
                    ]}
                  />
                  <CustomText
                    title={'per unit'}
                    textStyle={[
                      FontStyles.subText,
                      textColor(colors.fadeTextColor),
                      fS(13),
                      ml(5),
                    ]}
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                GlobalStyles.viewLine,
                height(1),
                GlobalStyles.containerPaddings,
              ]}
            />
            <View style={[CartStyles.viewQty, mt(-1)]}>
              <CustomText
                title={quantity}
                textStyle={[CartStyles.qtyText, Typography.style.subTextU()]}
              />

              <View style={[GlobalStyles.viewRow]}>
                <PressableOpacity onPress={() => updateQty(minus)}>
                  <View
                    style={[GlobalStyles.qtycircle, GlobalStyles.viewCenter,bgColor(Colors.color_E5E7EB)]}
                  >
                    <MinusSVG />
                  </View>
                </PressableOpacity>

                <TextInput
                  value={qty.toString()}
                  style={[
                    FontStyles.buttonText,
                    styles.qty,
                    ml(mvs(10)),
                    mr(10),
                  ]}
                  keyboardType="phone-pad"
                  textAlign={'center'}
                  maxLength={3}
                  onChangeText={text => { 
                    //here user if delete all quantity by default 1 will be shown
                    const numeric = text.replace(/[^0-9]/g, '');
                    if (numeric === '') {
                      setQty(1);
                      return;
                    }
                    let num = parseInt(numeric, 10);
                    if (num < 1) num = 1;
                    if (num > 999) num = 999;
                    setQty(num);
                  }}
                  onBlur={() => {
                    if (qty === 0) setQty(1);
                  }}
                />

                <PressableOpacity onPress={() => updateQty(plus)}>
                  <View
                    style={[GlobalStyles.qtycircle, GlobalStyles.viewCenter,bgColor(Colors.color_E5E7EB)]}
                  >
                    <PlusSVG />
                  </View>
                </PressableOpacity>
              </View>
            </View>

            <ViewOutlined viewStyle={[CartStyles.viewitemTotal]}>
              <CustomText
                title={itemTotal}
                textStyle={[
                  CartStyles.itemTotalText,
                  fS(12),
                  textColor(colors.fadeTextColor),
                  Typography.style.subTextU(),
                ]}
              />
              <CustomText
                title={`₹${mastertQrData?.data?.perUnitPrice * qty}`}
                textStyle={[FontStyles.headingText]}
              />
            </ViewOutlined>
          </Card>

          <Card style={[mt(15), getShadowWithElevation(1)]}>
            <View style={[CartStyles.viewTotal]}>
              <PriceBreakDownSVG />
              <CustomText
                title={pricebreakdown}
                textStyle={[CartStyles.priceBreakDownText]}
              />
            </View>

            <View style={CartStyles.viewSubTotal}>
              <CustomText
                title={subTotal}
                textStyle={[
                  CartStyles.itemTotalText,
                  textColor(colors.fadeTextColor),
                  Typography.weights.mediumU(),
                ]}
              />
              <CustomText
                title={`₹${mastertQrData?.data?.perUnitPrice * qty}`}
                textStyle={[FontStyles.headingText]}
              />
            </View>

            <View style={CartStyles.viewSubTotal}>
              <CustomText
              title={`${t("gst")} (${mastertQrData?.data?.gst}%)`}
                textStyle={[
                  CartStyles.itemTotalText,
                  textColor(colors.fadeTextColor),
                  Typography.weights.mediumU(),
                ]}
              />
              <CustomText
                title={`₹${gstAmount.toFixed(2)}`}
                textStyle={[FontStyles.headingText]}
              />
            </View>
            <View style={[GlobalStyles.viewLine, mt(15)]} />
            <View style={CartStyles.viewSubTotal}>
              <CustomText
                title={total}
                textStyle={[CartStyles.itemTotalText, , fontW('500')]}
              />
              <CustomText
                title={`₹${totalAmount.toFixed(2)}`}
                textStyle={[
                  FontStyles.headingText,
                  fontColor(Colors.primaryColor),
                  fontW('500'),
                ]}
              />
            </View>
          </Card>

          <LinearGradient
            style={[CartStyles.viewViewIncluded, GlobalStyles.viewRow,mt(15)]}
            colors={[Colors.color_F0FDF4, Colors.color_EFF6FF]}
          >
            <View style={[ GlobalStyles.viewCenter]}>
              <RupeeSVG />
            </View>

            <View style={[GlobalStyles.viewCenter,GlobalStyles.viewRow,GlobalStyles.flexOne]}>
              <CustomText
                title={t(const_youwillearn)}
                textStyle={[FontStyles.headingText,ml(15), GlobalStyles.flexOne]}  />
            
            <CustomText
                title={`₹${earningAmount.toFixed(2)}`}
                textStyle={[
                  textIncludedStyle(5),
                 FontStyles.headingText,
                 fontColor(Colors.color_139944)]}/>
                 </View>
                  
          </LinearGradient>

          <LinearGradient
            style={[CartStyles.viewViewIncluded, GlobalStyles.viewRow]}
            colors={[Colors.color_F0FDF4, Colors.color_EFF6FF]}>
            <View style={[CartStyles.circleGreen, GlobalStyles.viewCenter]}>
              <TickWhiteSVG />
            </View>

            <View style={[ml(15), GlobalStyles.flexShrink1]}>
              <CustomText
                title={whatincluded}
                textStyle={[FontStyles.headingText]}
              />
              <View style={[GlobalStyles.viewRow]} >
              <FlatList
  data={includesArray(mastertQrData)}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={[GlobalStyles.viewRow,GlobalStyles.alignItem]}>
      <CustomText
        title="•"
        textStyle={[
          FontStyles.headingText,
          mr(6)
        ]}
      />

      <CustomText
        title={item}
        textStyle={[
          FontStyles.subText,
          textColor(colors.fadeTextColor),
        ]}
      />
    </View>
  )}
/>

              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={[CartStyles.totalView,mt(10)]}>
          <View
            style={[
              CartStyles.viewSubTotal,
              mt(2),
            ]}
          >
            <CustomText
              title={const_totalAmount}
              textStyle={[
                CartStyles.itemTotalText,
                fS(11),
                textColor(colors.fadeTextColor),
                Typography.style.subTextU(),
              ]}
            />
            <CustomText
              title={`₹${totalAmount.toFixed(2)}`}
              textStyle={[
                FontStyles.headingText,
                fontColor(Colors.primaryColor),
                fontW('600'),
              ]}
            />
          </View>
          <CustomButton
            leftIcon={<CartSVG />}
            title={buynow}
            textStyles={[fS(14), pl(10)]}
            onPress={() => dispatch(OrderQrRequest({ quantity: qty }))}
            buttonStyle={[
              GlobalStyles.ZuvyDashBoardContainer,
              mb(0),
              GlobalStyles.containerPaddings,
              height(50),
              width(screenWidth - 20),
            ]}
          />
          <View style={[GlobalStyles.viewRow,GlobalStyles.viewCenter,mt(8)]}>
            <View style={[GlobalStyles.viewRow,GlobalStyles.viewCenter]}>
              <SecurePaymentSVG/>
          <CustomText
            title={securePayment}
            textStyle={[
              CartStyles.itemTotalText,
              fontW('500'),
              textColor(colors.color_6B7280),
              ml(5)
            ]}/>
            </View>

              <View style={[GlobalStyles.viewRow,GlobalStyles.viewCenter,ml(10)]}>
              <ActiviteSupportSVG/>
          <CustomText
            title={const_active_support_team}
            textStyle={[
              CartStyles.itemTotalText,
              fontW('500'),
              textColor(colors.color_6B7280),
              ml(5)
            ]}/>
            </View>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  qty: {
    width: ms(55),
    height: ms(35),
    borderRadius: mvs(3),
    borderWidth: ms(0.5),
    borderColor: colors.borderColor,
    paddingVertical: 0,
    textAlignVertical: 'center', // Android vertical center
    fontSize: 14,
    lineHeight: ms(10), // PERFECT match (adjust 6–8 if needed)
  },
  bottomView:{
    alignItems: 'center', 
    justifyContent: 'flex-start' 
  }
});

export default React.memo(YourCart);
