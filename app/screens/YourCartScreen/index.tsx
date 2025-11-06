import React, { useEffect, useState } from "react";
import {View} from 'react-native';
import HeaderWithBackButton from "../../components/atoms/HeaderWithBackButton";
import { alltimesupport, analyticDashboard, buynow, const_totalAmount, instantCode, itemTotal, minus, notifications, oneyearvalidity, plus, pricebreakdown, quantity, securePayment, subTotal, total, whatincluded, yourCart } from "../../types/constants";
import { yourCartProps } from "../../navigation/types";
import Header from "../../components/atoms/Header";
import { useTranslation } from "react-i18next";
import GlobalStyles, { getShadowWithElevation } from "../../styles/GlobalStyles";
import {bgColor, fontColor, fontW, fS, height, mb, ml, mr, mt, padding, paddingH, pb, pl, textColor, textIncludedStyle} from "../../utils/spaces";
import Card from "../../components/atoms/Card";
import LinearGradient from "../../components/atoms/LinearGradient";
import { Colors, Typography } from "../../styles";
import { CartSVG, DigiLockerSVG, MinusSVG, PlusSVG, PriceBreakDownSVG, QRCodeSVG, TickWhiteSVG } from "../../assets/svg";
import { CustomText } from "../../components/atoms/Text";
import FontStyles from "../../styles/FontStyles";
import PressableOpacity from "../../components/atoms/PressableOpacity";
import ViewOutlined from "../../components/atoms/ViewOutlined";
import CartStyles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/atoms/Button";
import VerificationIdentityScreens from "../VerificationIdentityScreens";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { MasterQrRequest, OrderQrRequest } from "./yourCartSlice";
import { showAlert } from "../../components/atoms/AlertBox/showAlert";
import BlueWhiteBackground from "../../components/atoms/DashBoardBG";
import colors from "../../styles/colors";
import HeaderComponent from "../../components/atoms/HeaderComponent";
import CustomButton from "../../components/atoms/CustomButton";
import { mvs } from "react-native-size-matters";
import { Flex } from "native-base";

const YourCart = ({navigation} : yourCartProps) => {

    const {t} = useTranslation();

    
    const [qty,setQty] = useState(1);
    const [gstAmount,setGSTAmout] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0)
    const dispatch = useDispatch();

        const { error,mastertQrData } = useSelector((state: RootState) => state.masterQr);
        const { qrCodeError,orderQrData } = useSelector((state: RootState) => state.masterQr);

    
    useEffect(() => {

      if(mastertQrData || error)
      {
          if(mastertQrData)
          {
          
          }else{
            console.log('MasterQrError '+error)
          }
      }

    },[mastertQrData,error])


    useEffect(() =>{

      if(orderQrData)
      {
        console.log('OrderData '+JSON.stringify(orderQrData))
        if(orderQrData?.success)
        {
          navigation.replace('CheckOutDetail',{data : orderQrData?.data})
        }
      }else{
        showAlert(qrCodeError?.message)
      }

    },[qrCodeError,orderQrData])


    useEffect(() =>{
      dispatch(MasterQrRequest())
    },[])



    useEffect(() => {
      const totalPrice = qty * mastertQrData?.data?.perUnitPrice;
  const gstPrice = totalPrice * (mastertQrData?.data?.gst / 100);
  setGSTAmout(gstPrice);

  const totalAmount = Number(totalPrice) + gstPrice;
      setTotalAmount(totalAmount);
    },[qty,mastertQrData])

    const handleBackPress = () => {
        console.log("BackPRess");
    }

  const updateQty = (type: 'plus'| 'minus') =>  {
     setQty(prev =>{ if(type === plus) 
        { 
            return prev + 1;
         }
  else if(type === minus && prev != 1) 
    { 
        return prev - 1 

    } return prev; }) 
}

const HandleBuyNow = () => {
  navigation?.replace('CheckOutDetail')
//dispatch(OrderQrRequest({quantity:qty}))
}

    return (
    <BlueWhiteBackground
      headerHeight={90}
      BlueWhiteBackgroundStyle={{ backgroundColor: colors.white }}
    >
      <HeaderComponent
        showBack={true}
        IconColor={GlobalStyles.blackcolor.color}
        title={t(yourCart)}
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
        <View style={[GlobalStyles.topParentView]}>
          <Card style={[getShadowWithElevation(1)]}>
            <View style={[GlobalStyles.viewRow]}>
              <LinearGradient
                style={CartStyles.viewLinearGradient}
                colors={[Colors.color_FFD51C, Colors.primaryColor]}
              >
                <QRCodeSVG />
              </LinearGradient>

              <View style={[ml(10), GlobalStyles.flexOne]}>
                <CustomText
                  title={mastertQrData?.data?.qrName}
                  textStyle={[FontStyles.headingText]}
                />
                <CustomText
                  title={mastertQrData?.data?.description}
                  textStyle={[
                    Typography.style.smallTextU(),
                    textColor(colors.fadeTextColor),
                    pb(10),
                  ]}
                />
                <View
                  style={[GlobalStyles.viewRow, mt(5), GlobalStyles.viewCenter]}
                >
                  <CustomText
                    title={mastertQrData?.data?.perUnitPrice}
                    textStyle={[
                      FontStyles.headingText,
                      GlobalStyles.flexOne,
                      fontW('600'),
                    ]}
                  />
                  <CustomText
                    title={'per unit'}
                    textStyle={[
                      FontStyles.subText,
                      textColor(colors.fadeTextColor),
                      fS(13),
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
                    style={[GlobalStyles.qtycircle, GlobalStyles.viewCenter]}
                  >
                    <MinusSVG />
                  </View>
                </PressableOpacity>

                <View style={[CartStyles.viewQty,ml(mvs(10)),mr(10),mt(0)]}>
                  <CustomText title={qty} textStyle={[FontStyles.buttonText]} />
                </View>

                <PressableOpacity onPress={() => updateQty(plus)}>
                  <View
                    style={[GlobalStyles.qtycircle, GlobalStyles.viewCenter]}
                  >
                    <PlusSVG />
                  </View>
                </PressableOpacity>
              </View>
            </View>

            <ViewOutlined viewStyle={[CartStyles.viewitemTotal, paddingH(10)]}>
              <CustomText
                title={itemTotal}
                textStyle={[
                  CartStyles.itemTotalText,
                  fS(13),
                  textColor(colors.fadeTextColor),
                  Typography.style.subTextU(),
                  pl(8),
                ]}
              />
              <CustomText
                title={`₹${mastertQrData?.data?.perUnitPrice}`}
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
                  Typography.style.smallTextU(),
                ]}
              />
              <CustomText
                title={`₹${mastertQrData?.data?.perUnitPrice * qty}`}
                textStyle={[FontStyles.headingText]}
              />
            </View>

            <View style={CartStyles.viewSubTotal}>
              <CustomText
                title={`GST (${mastertQrData?.data?.gst}%)`}
                textStyle={[
                  CartStyles.itemTotalText,
                  textColor(colors.fadeTextColor),
                  Typography.style.smallTextU(),
                ]}/>
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
            style={[CartStyles.viewViewIncluded, GlobalStyles.viewRow]}
            colors={[Colors.color_F0FDF4, Colors.color_EFF6FF]}>
            <View style={[CartStyles.circleGreen, GlobalStyles.viewCenter]}>
              <TickWhiteSVG />
            </View>

            <View style={[ml(15),GlobalStyles.flexShrink1]}>
              <CustomText
                title={whatincluded}
                textStyle={[FontStyles.headingText]}
              />
              <CustomText
                title={`${mastertQrData?.data?.whatInclude}`}
                textStyle={[
                  textIncludedStyle(5),
                  textColor(colors.fadeTextColor),
                  Typography.style.smallTextU(),
                ]}
              />

              {/* <CustomText
                title={oneyearvalidity}
                textStyle={[
                  textIncludedStyle(5),
                  Typography.style.smallTextU(),
                  textColor(colors.fadeTextColor),
                ]}
              />
              <CustomText
                title={analyticDashboard}
                textStyle={[
                  textIncludedStyle(5),
                  Typography.style.smallTextU(),
                  textColor(colors.fadeTextColor),
                ]}
              />
              <CustomText
                title={alltimesupport}
                textStyle={[
                  textIncludedStyle(5),
                  Typography.style.smallTextU(),
                  textColor(colors.fadeTextColor),
                ]}
              /> */}
            </View>
          </LinearGradient>
        </View>
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
            onPress={() => dispatch(OrderQrRequest({quantity:qty}))}
            buttonStyle={[
              GlobalStyles.ZuvyDashBoardContainer,
              mb(0),
              GlobalStyles.containerPaddings,
              height(50),
            ]}
          />

          <CustomText
            title={securePayment}
            textStyle={[
              CartStyles.itemTotalText,
              GlobalStyles.containerPaddings,
              mb(60),
              fS(11),
              fontW('100'),
              textColor(colors.fadeTextColor),
            ]}
          />
        </View>
      </ScrollView>
    </BlueWhiteBackground>
  );
}

export default React.memo(YourCart);