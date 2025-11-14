import React from "react";
import { View } from "react-native";
import { PaymentSVG, TickCircleSVG } from "../../../assets/svg";
import { height, ml, mr, mt, textColor, width } from "../../../utils/spaces";
import { CustomText } from "../Text";
import GlobalStyles from "../../../styles/GlobalStyles";
import FontStyles from "../../../styles/FontStyles";
import CartStyles from "../../../screens/YourCartScreen/styles";
import NotificationStyles from "../../../screens/NotificationScreen/styles";
import { formatDateTime } from "../../../utils/helper";
import { ms } from "react-native-size-matters";

type NotificationItemProps = {
    data?: string
}

const NotificationItems =({data}: NotificationItemProps) =>{
   
    console.log('Data'+JSON.stringify(data));
    return(
        <View style={[NotificationStyles.itemViews]}>

          <View style={[GlobalStyles.viewRow,GlobalStyles.alignContent]}>  

            <View style={[mt(3)]}>
           {data?.type == 'PAYMENT' ? <PaymentSVG  height={ms(30)} width={ms(30)}/> :   <TickCircleSVG height={ms(30)} width={ms(30)}/>}
              </View>
         <View style={[ml(5)]}>
                
            <View style={[GlobalStyles.viewRow]}>    
            <CustomText title={data?.title} textStyle={[FontStyles.buttonText]}/>
            {/* {
                data?.isNew &&

                <View style={[NotificationStyles.viewNew,mr(20),GlobalStyles.viewCenter]}>
                      <CustomText title="New" textStyle={[NotificationStyles.newText]}/>  
                    </View>
            } */}
            </View>
            <CustomText title={data?.body} textStyle={[CartStyles.subTitleText]}/>
            <CustomText title={formatDateTime(data?.createdAt)} textStyle={[CartStyles.subTitleText]}/>
         
         </View>
         </View>
            <View style={[GlobalStyles.viewLine,mt(10)]}/>
        </View>
    )
}

export default React.memo(NotificationItems);