import React, { useEffect, useState } from "react";
import {View} from 'react-native';
import HeaderWithBackButton from "../../components/atoms/HeaderWithBackButton";
import { alltimesupport, analyticDashboard, buynow, const_totalAmount, instantCode, itemTotal, minus, notifications, oneyearvalidity, plus, pricebreakdown, quantity, securePayment, subTotal, total, totalamount, verifyIdentity, whatincluded, yourCart } from "../../types/constants";
import { yourCartProps } from "../../navigation/types";
import Header from "../../components/atoms/Header";
import { useTranslation } from "react-i18next";
import GlobalStyles from "../../styles/GlobalStyles";
import {bgColor, fontColor, mb, ml, mt, padding, textColor, textIncludedStyle} from "../../utils/spaces";
import Card from "../../components/atoms/Card";
import LinearGradient from "../../components/atoms/LinearGradient";
import { Colors } from "../../styles";
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

const YourCart = ({navigation} : yourCartProps) => {

    const {t} = useTranslation();

    
    const [qty,setQty] = useState(1);
    const [qtyPrice,setQtyPrice] = useState(0);
    const [gstAmount,setGSTAmout] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0)
    const [gst,setGst] = useState(0);
    const dispatch = useDispatch();

        const { error,mastertQrData } = useSelector((state: RootState) => state.masterQr);
        const { qrCodeError,orderQrData } = useSelector((state: RootState) => state.masterQr);

    
    useEffect(() => {

      if(mastertQrData || error)
      {
          if(mastertQrData)
          {
            const data = mastertQrData?.data;
          
          setGst(data?.gst); // ✅ ensure it’s a number
          console.log('GST '+data?.gst)
            setQtyPrice(data?.perUnitPrice);
          }else{
            console.log('MasterQrError '+error)
          }
      }

    },[mastertQrData,error])


    useEffect(() =>{

      if(orderQrData)
      {
        console.log('OrderData '+JSON.stringify(orderQrData))
      }else{
        showAlert(qrCodeError?.message)
      }

    },[qrCodeError,orderQrData])


    useEffect(() =>{
      dispatch(MasterQrRequest())
    },[])

    useEffect(() => {
      const totalPrice = qty * qtyPrice;
     console.log('Total '+totalPrice);
  const gstPrice = totalPrice * (gst / 100);
  console.log('GSTT'+gstPrice);
  setGSTAmout(gstPrice);

  
const totalAmount = Number(totalPrice) + gstPrice;
console.log(totalAmount.toFixed(2)); // ✅ 21.08
      setTotalAmount(totalAmount);
    },[qty])

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

    return(
        <Header>
        <HeaderWithBackButton title={t(yourCart)} onPress={handleBackPress}/>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyles.topParentView]}>
        <Card>
            <View style={[GlobalStyles.viewRow]}>
            
            <LinearGradient style={CartStyles.viewLinearGradient} colors={[Colors.color_FFD51C,Colors.primaryColor]}>

                <QRCodeSVG/>

                </LinearGradient>

          <View style={[ml(10),GlobalStyles.flexOne]}>
            <CustomText title={mastertQrData?.data?.qrName} textStyle={[FontStyles.headingText]}/>
            <CustomText title={mastertQrData?.data?.description} textStyle={CartStyles.subTitleText}/>
            <View style={[GlobalStyles.viewRow,mt(5),GlobalStyles.viewCenter]}>
            <CustomText title={mastertQrData?.data?.perUnitPrice} textStyle={[FontStyles.headingText,GlobalStyles.flexOne]}/>
            <CustomText title={"per unit"} textStyle={[FontStyles.subText,fontColor(Colors.color_4B5563)]}/>
            </View>
            </View>
</View>
             <View style={[CartStyles.viewQty]}>
             <CustomText title={quantity} textStyle={CartStyles.qtyText}/>

             <View style={[GlobalStyles.viewRow]}>

                 <PressableOpacity onPress={() => updateQty(minus)}>  
                <View style={[GlobalStyles.qtycircle,GlobalStyles.viewCenter]}>
                    <MinusSVG/>
                </View>
                </PressableOpacity> 

                <View style={[CartStyles.mainQTY]}>
                <CustomText title={qty} textStyle={[FontStyles.buttonText]}/>
                </View>

                   <PressableOpacity onPress={() => updateQty(plus)}>                  
            <View style={[GlobalStyles.qtycircle,GlobalStyles.viewCenter]}>
                    <PlusSVG/>
                </View>
                </PressableOpacity>
                </View>   
            </View>  

            <ViewOutlined viewStyle={CartStyles.viewitemTotal}>
                
              <CustomText title={itemTotal} textStyle={CartStyles.itemTotalText}/>
            <CustomText title={`₹${qtyPrice * qty}`} textStyle={[FontStyles.headingText]}/>
            </ViewOutlined>
        </Card>

        <Card style={[mt(15)]}>

         <View style={[CartStyles.viewTotal]}>
            <PriceBreakDownSVG/>
            <CustomText title={pricebreakdown} textStyle={[CartStyles.priceBreakDownText]}/>
         </View>

            <View style={CartStyles.viewSubTotal}>  
              <CustomText title={subTotal} textStyle={CartStyles.itemTotalText}/>
            <CustomText title={`₹${qtyPrice * qty}`} textStyle={[FontStyles.headingText]}/>
            </View>


            <View style={CartStyles.viewSubTotal}>  
              <CustomText title={`GST ${mastertQrData?.data?.gst}`} textStyle={CartStyles.itemTotalText}/>
            
            <CustomText title={`₹${Number(gstAmount).toFixed(2)}`} textStyle={[FontStyles.headingText]}/>
            </View>
            <View style={[GlobalStyles.viewLine,mt(15)]}/>
             <View style={CartStyles.viewSubTotal}>  
              <CustomText title={total} textStyle={CartStyles.itemTotalText}/>
            <CustomText title={`₹${Number(totalAmount).toFixed(2)}`} textStyle={[FontStyles.headingText,fontColor(Colors.primaryColor)]}/>
            </View>
        </Card>


            <LinearGradient style={[CartStyles.viewViewIncluded,GlobalStyles.viewRow]} colors={[Colors.color_F0FDF4,Colors.color_EFF6FF]}>

                <View style={[CartStyles.circleGreen,GlobalStyles.viewCenter]}>
                <TickWhiteSVG/>
                </View>

                <View style={[ml(15),GlobalStyles.flexOne]}>
                 
                 <CustomText title={mastertQrData?.data?.whatInclude} textStyle={[textIncludedStyle(5)]}/>

                {/* <CustomText title={instantCode} textStyle={[textIncludedStyle(5)]} />\

                 <CustomText title={oneyearvalidity} textStyle={[textIncludedStyle(5)]} />
                 <CustomText title={analyticDashboard} textStyle={[textIncludedStyle(5)]} />
                 <CustomText title={alltimesupport} textStyle={[textIncludedStyle(5)]} /> */}

                </View>
                </LinearGradient>
        </View>
        </ScrollView>
          <View style={[CartStyles.totalView]}>

               <View style={CartStyles.viewSubTotal}>  
              <CustomText title={const_totalAmount} textStyle={CartStyles.itemTotalText}/>
            <CustomText title={`₹${Number(totalAmount).toFixed(2)}`} textStyle={[FontStyles.headingText,fontColor(Colors.primaryColor)]}/>
            </View>

            
  <Button 
        onPress={() => handlebuyNow() }
        image={<CartSVG/>} 
        viewStyle={[CartStyles.btnBuyNow]} 
        title={buynow} titleStyle={[ml(10),textColor(Colors.white)]}/>

      <CustomText title={securePayment} textStyle={[CartStyles.itemTotalText,mt(10),mb(10)]}/>

            </View>
</Header>
    )
}

export default React.memo(YourCart);