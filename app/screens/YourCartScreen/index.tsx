import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ms, mvs } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import HeaderWithBackButton from '../../components/atoms/HeaderWithBackButton';
import Card from '../../components/atoms/Card';
import LinearGradient from '../../components/atoms/LinearGradient';
import CustomButton from '../../components/atoms/CustomButton';
import TextInput from '../../components/atoms/TextInput';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import { CustomText } from '../../components/atoms/Text';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';

import {
  MasterQrRequest,
  OrderQrRequest,
  ResetOrderData,
} from './yourCartSlice';
import {
  ProfileRequest,
} from '../UserProfile/profileSlice';
import {
  ResetRazorPay,
  VerifyRazorPayRequest,
} from '../CheckoutDetails/checkoutSlice';

import {
  alltimesupport,
  buynow,
  const_active_support_team,
  const_totalAmount,
  const_youwillearn,
  gst,
  itemTotal,
  minus,
  plus,
  pricebreakdown,
  quantity,
  securePayment,
  subTotal,
  total,
  whatincluded,
  yourCart,
} from '../../types/constants';

import {
  Colors,
  Typography,
} from '../../styles';
import FontStyles from '../../styles/FontStyles';
import GlobalStyles, { getShadowWithElevation } from '../../styles/GlobalStyles';
import colors from '../../styles/colors';
import CartStyles from './styles';
import { screenWidth } from '../../utils/dimensions';
import { includesArray } from '../../utils/helper';
import config from '../config';
import RazorpayCheckout from 'react-native-razorpay';

import {
  ActiviteSupportSVG,
  CartSVG,
  MinusSVG,
  PlusSVG,
  PriceBreakDownSVG,
  QRCodeSVG,
  RupeeSVG,
  SecurePaymentSVG,
  TickWhiteSVG,
} from '../../assets/svg';

import {
  bgColor,
  fontColor,
  fontW,
  fS,
  height,
  ml,
  mt,
  mb,
  textColor,
  textIncludedStyle,
  width,
  mr,
  pr,
  pl,
} from '../../utils/spaces';

import { yourCartProps } from '../../navigation/types';
import { RootState } from '../../redux/rootReducer';
import PressableOpacity from '../../components/atoms/PressableOpacity';

const YourCart = ({ navigation }: yourCartProps) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [gstAmount, setGSTAmout] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [earningAmount, setEarningAmount] = useState(0);

  const { error, mastertQrData, orderQrData, qrCodeError } = useSelector(
    (state: RootState) => state.masterQr,
  );
  const { profileData, error: profileError } = useSelector(
    (state: RootState) => state.profile,
  );
  const { verifyRazaorPay_data, verifyRazaorPay_error } = useSelector(
    (state: RootState) => state.verifyRazorPayment,
  );

  // Fetch QR Data
  useEffect(() => {
    dispatch(MasterQrRequest());
    dispatch(ProfileRequest());
  }, []);

  // Handle Order QR Data
  useEffect(() => {
    if (orderQrData) {
      if (orderQrData?.success) {
        handleCheckout();
        dispatch(ResetOrderData());
      }
    } else {
      if (qrCodeError) showAlert(qrCodeError?.message);
    }
  }, [orderQrData, qrCodeError]);

  // Handle RazorPay verification
  useEffect(() => {
    if (verifyRazaorPay_data?.success) {
      dispatch(ResetOrderData());
      dispatch(ResetRazorPay());
      navigation.replace('merchantTabs');
    } else if (verifyRazaorPay_error) {
      showAlert(verifyRazaorPay_error?.message);
    }
  }, [verifyRazaorPay_data, verifyRazaorPay_error]);

  // Handle qty & calculation
  useEffect(() => {
    if (!mastertQrData?.data) return;

    const totalPrice = qty * mastertQrData.data.perUnitPrice;
    const gstPrice = totalPrice * (mastertQrData.data.gst / 100);
    setGSTAmout(gstPrice);

    const totalAmt = totalPrice + gstPrice;
    setTotalAmount(totalAmt);

    const earning = totalPrice * 0.33;
    setEarningAmount(earning);
  }, [qty, mastertQrData]);

  const handleBackPress = () => navigation.goBack();

  const updateQty = (type: 'plus' | 'minus') => {
    setQty(prev => {
      if (type === 'plus') return Math.min(prev + 1, 999);
      return Math.max(prev - 1, 1);
    });
  };

  const handleCheckout = () => {
    const orderData = orderQrData?.data;
    if (!mastertQrData?.data?.hasCheckoutDetails) {
      navigation.navigate('CheckOutDetail', { data: orderData });
    } else {
      const options: any = {
        description: mastertQrData?.data?.description || 'Payment for QR Package',
        image: config.zuvyBlueLogoforRazarPay,
        currency: orderData?.currency,
        key: config.RazarPayLiveKey,
        amount: parseInt(orderData.amount) * 100,
        order_id: orderData?.razorpayOrderId,
        prefill: {
          email: profileData?.data?.email,
          contact: profileData?.data?.mobile,
          name: profileData?.data?.name,
        },
        theme: { color: colors.white },
      };

      RazorpayCheckout.open(options)
        .then(data => {
          dispatch(
            VerifyRazorPayRequest({
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id,
              razorpay_signature: data.razorpay_signature,
            }),
          );
        })
        .catch(error => {
          if (error?.error?.reason === 'payment_cancelled') {
            Alert.alert('Cancelled', 'You cancelled the payment.');
          } else {
            Alert.alert('Error', 'Payment failed.');
          }
        });
    }
  };

  return (
    <SafeAreaView style={[GlobalStyles.flexOne]}>
      <HeaderWithBackButton title={yourCart} onPress={handleBackPress} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: colors.color_F9FAFB }}
      >
        <View style={[GlobalStyles.topParentView]}>
          {/* QR Card */}
          <Card style={[getShadowWithElevation(1)]}>
            <View style={[GlobalStyles.viewRow]}>
              <LinearGradient
                style={CartStyles.viewLinearGradient}
                colors={[Colors.color_FFD51C, Colors.primaryColor]}
              >
                <QRCodeSVG />
              </LinearGradient>

              <View style={[ml(10), GlobalStyles.flexOne]}>
                <CustomText title={mastertQrData?.data?.qrName} textStyle={[FontStyles.headingText]} />
                <CustomText
                  title={mastertQrData?.data?.description}
                  textStyle={[Typography.style.smallTextU(), textColor(colors.fadeTextColor), { paddingBottom: 10 }]}
                />
                <View style={[GlobalStyles.viewRow, GlobalStyles.viewRight, mb(10)]}>
                  <CustomText
                    title={`₹${mastertQrData?.data?.perUnitPrice}`}
                    textStyle={[FontStyles.headingText, fontW('600')]}
                  />
                  <CustomText
                    title={'per unit'}
                    textStyle={[FontStyles.subText, textColor(colors.fadeTextColor), fS(13), ml(5)]}
                  />
                </View>
              </View>
            </View>

            {/* Qty */}
            <View style={[CartStyles.viewQty]}>
              <CustomText title={quantity} textStyle={[CartStyles.qtyText, Typography.style.subTextU()]} />
              <View style={[GlobalStyles.viewRow]}>
                <PressableOpacity onPress={() => updateQty(minus)}>
                  <View style={[GlobalStyles.qtycircle, GlobalStyles.viewCenter, bgColor(Colors.color_E5E7EB)]}>
                    <MinusSVG />
                  </View>
                </PressableOpacity>

                <TextInput
                  value={qty.toString()}
                  style={[FontStyles.buttonText, styles.qty, ml(mvs(10)), mb(0)]}
                  keyboardType="phone-pad"
                  textAlign="center"
                  maxLength={3}
                  onChangeText={text => {
                    const numeric = text.replace(/[^0-9]/g, '');
                    setQty(numeric ? Math.min(Math.max(parseInt(numeric), 1), 999) : 1);
                  }}
                  onBlur={() => {
                    if (qty === 0) setQty(1);
                  }}
                />

                <PressableOpacity onPress={() => updateQty(plus)}>
                  <View style={[GlobalStyles.qtycircle, GlobalStyles.viewCenter, bgColor(Colors.color_E5E7EB)]}>
                    <PlusSVG />
                  </View>
                </PressableOpacity>
              </View>
            </View>

            {/* Item Total */}
            <ViewOutlined viewStyle={[CartStyles.viewitemTotal, pl(3), pr(3)]}>
              <CustomText title={itemTotal} textStyle={[CartStyles.itemTotalText, fS(12), textColor(colors.fadeTextColor), Typography.style.subTextU()]} />
              <CustomText title={`₹${mastertQrData?.data?.perUnitPrice * qty}`} textStyle={[FontStyles.headingText]} />
            </ViewOutlined>
          </Card>

          {/* Price Breakdown */}
          <Card style={[mt(15), getShadowWithElevation(1)]}>
            <View style={[CartStyles.viewTotal]}>
              <PriceBreakDownSVG />
              <CustomText title={pricebreakdown} textStyle={[CartStyles.priceBreakDownText]} />
            </View>

            <View style={CartStyles.viewSubTotal}>
              <CustomText title={subTotal} textStyle={[CartStyles.itemTotalText, textColor(colors.fadeTextColor), Typography.weights.mediumU()]} />
              <CustomText title={`₹${mastertQrData?.data?.perUnitPrice * qty}`} textStyle={[FontStyles.headingText]} />
            </View>

            <View style={CartStyles.viewSubTotal}>
              <CustomText title={`${gst} (${mastertQrData?.data?.gst}%)`} textStyle={[CartStyles.itemTotalText, textColor(colors.fadeTextColor), Typography.weights.mediumU()]} />
              <CustomText title={`₹${gstAmount.toFixed(2)}`} textStyle={[FontStyles.headingText]} />
            </View>

            <View style={[GlobalStyles.viewLine, mt(15)]} />

            <View style={CartStyles.viewSubTotal}>
              <CustomText title={total} textStyle={[CartStyles.itemTotalText, fontW('500')]} />
              <CustomText title={`₹${totalAmount.toFixed(2)}`} textStyle={[FontStyles.headingText, fontColor(Colors.primaryColor), fontW('500')]} />
            </View>
          </Card>

          {/* Earning */}
          <LinearGradient
            style={[CartStyles.viewViewIncluded, GlobalStyles.viewRow, mt(15)]}
            colors={[Colors.color_F0FDF4, Colors.color_EFF6FF]}
          >
            <View style={[GlobalStyles.viewCenter]}>
              <RupeeSVG />
            </View>

            <View style={[GlobalStyles.viewCenter, GlobalStyles.viewRow, GlobalStyles.flexOne]}>
              <CustomText title={const_youwillearn} textStyle={[FontStyles.headingText, ml(15), GlobalStyles.flexOne]} />
              <CustomText title={`₹${earningAmount.toFixed(2)}`} textStyle={[textIncludedStyle(5), FontStyles.headingText, fontColor(Colors.color_139944)]} />
            </View>
          </LinearGradient>

          {/* What included */}
          <LinearGradient style={[CartStyles.viewViewIncluded, GlobalStyles.viewRow]} colors={[Colors.color_F0FDF4, Colors.color_EFF6FF]}>
            <View style={[CartStyles.circleGreen]}>
              <TickWhiteSVG />
            </View>

            <View style={[ml(15), GlobalStyles.flexShrink1]}>
              <CustomText title={whatincluded} textStyle={[FontStyles.headingText]} />
              <FlatList
                data={includesArray(mastertQrData) || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={[GlobalStyles.viewRow, GlobalStyles.alignItem, mb(5)]}>
                    <CustomText title="•" textStyle={[FontStyles.headingText, ml(0), mr(6)]} />
                    <CustomText title={item} textStyle={[FontStyles.subText, textColor(colors.fadeTextColor)]} />
                  </View>
                )}
              />
            </View>
          </LinearGradient>

          {/* Buy Now Button */}
          <View style={[CartStyles.totalView, mt(10)]}>
            <View style={[CartStyles.viewSubTotal, mt(2)]}>
              <CustomText title={const_totalAmount} textStyle={[CartStyles.itemTotalText, fS(11), textColor(colors.fadeTextColor), Typography.style.subTextU()]} />
              <CustomText title={`₹${totalAmount.toFixed(2)}`} textStyle={[FontStyles.headingText, fontColor(Colors.primaryColor), fontW('600')]} />
            </View>

            <CustomButton
              leftIcon={<CartSVG />}
              title={buynow}
              textStyles={[fS(14), ml(10)]}
              onPress={() => dispatch(OrderQrRequest({ quantity: qty }))}
              buttonStyle={[GlobalStyles.ZuvyDashBoardContainer, mb(0), GlobalStyles.containerPaddings, height(50), width(screenWidth - 20)]}
            />

            <View style={[GlobalStyles.viewRow, GlobalStyles.viewCenter, mt(8)]}>
              <View style={[GlobalStyles.viewRow, GlobalStyles.viewCenter]}>
                <SecurePaymentSVG />
                <CustomText title={securePayment} textStyle={[CartStyles.itemTotalText, fontW('500'), textColor(colors.color_6B7280), ml(5)]} />
              </View>

              <View style={[GlobalStyles.viewRow, GlobalStyles.viewCenter, ml(10)]}>
                <ActiviteSupportSVG />
                <CustomText title={const_active_support_team} textStyle={[CartStyles.itemTotalText, fontW('500'), textColor(colors.color_6B7280), ml(5)]} />
              </View>
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
    textAlignVertical: 'center',
    fontSize: 14,
    lineHeight: ms(10),
  },
});

export default React.memo(YourCart);
