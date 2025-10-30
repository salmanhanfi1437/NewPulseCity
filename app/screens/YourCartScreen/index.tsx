import React, { useEffect, useState } from "react";
import {View} from 'react-native';
import HeaderWithBackButton from "../../components/atoms/HeaderWithBackButton";
import { alltimesupport, analyticDashboard, instantCode, itemTotal, minus, oneyearvalidity, plus, pricebreakdown, quantity, subTotal, total, whatincluded, yourCart } from "../../types/constants";
import { yourCartProps } from "../../navigation/types";
import Header from "../../components/atoms/Header";
import { useTranslation } from "react-i18next";
import GlobalStyles from "../../styles/GlobalStyles";
import {fontColor, ml, mt, padding} from "../../utils/spaces";
import {mvs } from "react-native-size-matters";
import Card from "../../components/atoms/Card";
import LinearGradient from "../../components/atoms/LinearGradient";
import { Colors } from "../../styles";
import { MinusSVG, PlusSVG, PriceBreakDownSVG, QRCodeSVG, TickWhiteSVG } from "../../assets/svg";
import { CustomText } from "../../components/atoms/Text";
import FontStyles from "../../styles/FontStyles";
import PressableOpacity from "../../components/atoms/PressableOpacity";
import ViewOutlined from "../../components/atoms/ViewOutlined";
import CartStyles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

const YourCart = ({navigation} : yourCartProps) => {

    const {t} = useTranslation();

    const [qrCodeName,setQrCodeName] = useState('Zuvy Smart QR');
    const [qty,setQty] = useState(1);
    const [qtyPrice,setQtyPrice] = useState(1600);
    const [gstAmount,setGSTAmout] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0)

    useEffect(() => {
      console.log('Qty' +qty);  
        const pricePerItem = 1600;
      const totalPrice = qty * pricePerItem;
        setQtyPrice(totalPrice);
      setQtyPrice(qty * 1600)

      // GST 18%
  const gst = totalPrice * 0.18;
  setGSTAmout(gst);

     // Total   

     setTotalAmount(gst + totalPrice);
    },[qty])

    const handleBackPress = () => {
        console.log("BackPRess");
    }

  const updateQty = (type: 'plus'| 'minus') =>  {
     setQty(prev =>{ if(type === plus) 
        { setQtyPrice((prev + 1) & qtyPrice) 
            return prev + 1;
         }
  else if(type === minus && prev != 1) 
    { 
        return prev - 1 

    } return prev; }) 
}

    return(
        <Header>
        <HeaderWithBackButton title={t(yourCart)} onPress={handleBackPress}/>
        <ScrollView>
        <View style={[GlobalStyles.topParentView]}>
        <Card>
            <View style={[GlobalStyles.viewRow]}>
            
            <LinearGradient style={CartStyles.viewLinearGradient} colors={[Colors.color_FFD51C,Colors.primaryColor]}>

                <QRCodeSVG/>

                </LinearGradient>

          <View style={[ml(mvs(10)),GlobalStyles.flexOne]}>
            <CustomText title={qrCodeName} textStyle={[FontStyles.headingText]}/>
            <CustomText title={"Digital QR Code Solution"} textStyle={CartStyles.subTitleText}/>
            <View style={[GlobalStyles.viewRow,mt(5),GlobalStyles.viewCenter]}>
            <CustomText title={"₹1,600"} textStyle={[FontStyles.headingText,GlobalStyles.flexOne]}/>
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
            <CustomText title={`₹${qtyPrice}`} textStyle={[FontStyles.headingText]}/>
            </ViewOutlined>
        </Card>

        <Card style={[mt(mvs(15))]}>

         <View style={[CartStyles.viewTotal]}>
            <PriceBreakDownSVG/>
            <CustomText title={pricebreakdown} textStyle={[CartStyles.priceBreakDownText]}/>
         </View>

            <View style={CartStyles.viewSubTotal}>  
              <CustomText title={subTotal} textStyle={CartStyles.itemTotalText}/>
            <CustomText title={`₹${qtyPrice}`} textStyle={[FontStyles.headingText]}/>
            </View>


            <View style={CartStyles.viewSubTotal}>  
              <CustomText title={'GST (18%)'} textStyle={CartStyles.itemTotalText}/>
            <CustomText title={`₹${gstAmount}`} textStyle={[FontStyles.headingText]}/>
            </View>
            <View style={[GlobalStyles.viewLine,mt(mvs(15))]}/>
             <View style={CartStyles.viewSubTotal}>  
              <CustomText title={total} textStyle={CartStyles.itemTotalText}/>
            <CustomText title={`₹${totalAmount}`} textStyle={[FontStyles.headingText,fontColor(Colors.primaryColor)]}/>
            </View>
        </Card>


            <LinearGradient style={[CartStyles.viewViewIncluded,mt(mvs(15)),GlobalStyles.viewRow,padding(mvs(15))]} colors={[Colors.color_F0FDF4,Colors.color_EFF6FF]}>

                <View style={[CartStyles.circleGreen,GlobalStyles.viewCenter]}>
                <TickWhiteSVG/>
                </View>

                <View style={[ml(15)]}>
                 
                   <CustomText title={whatincluded} textStyle={[FontStyles.headingText]}/>

                <CustomText title={instantCode} textStyle={[CartStyles.textincluded,mt(5)]} />\

                 <CustomText title={oneyearvalidity} textStyle={[CartStyles.textincluded,mt(5)]} />
                 <CustomText title={analyticDashboard} textStyle={[CartStyles.textincluded,mt(5)]} />
                 <CustomText title={alltimesupport} textStyle={[CartStyles.textincluded,mt(5)]} />

                </View>
                

                </LinearGradient>

        

        </View>
        </ScrollView>
</Header>
    )
}

export default React.memo(YourCart);