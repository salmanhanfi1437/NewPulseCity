import React from "react";
import { View } from "react-native";
import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import { completeKYC, contactSupport, kycompleted, learnMore, needHelp, proceedDigiLocker, protectAccount, rbi_norms, verifyIdentity, verifyIdentitySecurely, whykyc } from "../../types/constants";
import { DigiLockerSVG, TickCircleSVG, VerifyKYCSVG } from "../../assets/svg";
import GlobalStyles from "../../styles/GlobalStyles";
import { fontColor, ml, mt, pl} from "../../utils/spaces";
import { CustomText } from "../../components/atoms/Text";
import FontStyles from "../../styles/FontStyles";
import Card from "../../components/atoms/Card";
import { ms, mvs } from "react-native-size-matters";
import { Colors } from "../../styles";
import Button from "../../components/atoms/Button";
import { verifyIdentityProps } from "../../navigation/types";

const VerificationIdentity = ({navigation} : verifyIdentityProps) =>{

    const handleDigilockerPress = () => {
        navigation.replace(kycompleted); 
    }

    return(
        <BackgroundPrimaryColor title={verifyIdentity} subTitle={completeKYC}>
          <View style={[GlobalStyles.viewCenter,mt(20)]}>  
         
         <VerifyKYCSVG height={ms(120)}/> 

         <CustomText title={whykyc} textStyle={[FontStyles.headingText,mt(20)]}/>

         <Card style={[mt(20)]}>   
         <View style={[GlobalStyles.viewRow]}>
            <TickCircleSVG/>

            <CustomText title={verifyIdentitySecurely} textStyle={[GlobalStyles.viewCenter,ml(10),FontStyles.subText]}/>
        </View>

        <View style={[GlobalStyles.viewRow,mt(15)]}>
            <TickCircleSVG/>

            <CustomText title={protectAccount} textStyle={[GlobalStyles.viewCenter,ml(10),FontStyles.subText]}/>
        </View>

        <View style={[GlobalStyles.viewRow,mt(15)]}>
            <TickCircleSVG/>

            <CustomText title={rbi_norms} textStyle={[GlobalStyles.viewCenter,ml(10),FontStyles.subText]}/>
        </View>

           <CustomText title={learnMore} textStyle={[GlobalStyles.viewCenter,mt(10),FontStyles.headingText,fontColor(Colors.primaryColor),GlobalStyles.textAlign]}/>
         </Card>

        <Button 
        onPress={handleDigilockerPress}
        image={<DigiLockerSVG/>} viewStyle={[mt(20),GlobalStyles.viewRow,GlobalStyles.viewCenter]} 
        title={proceedDigiLocker} titleStyle={[ml(10)]}/>

            <View style={[GlobalStyles.viewRow,GlobalStyles.viewCenter,mt(10)]}>
                <CustomText title={needHelp} textStyle={[FontStyles.subText,fontColor(Colors.color_6B7280)]}/>
                 <CustomText title={contactSupport} textStyle={[FontStyles.subText,fontColor(Colors.color_6B7280),ml(2)]} underline={true}/>

            </View>

        </View>
        </BackgroundPrimaryColor>
    )
}



export default React.memo(VerificationIdentity);