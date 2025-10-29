import React from "react";
import {View} from 'react-native';
import GlobalStyles from "../../styles/GlobalStyles";
import { bgColor, fontColor, mt, pl, pr } from "../../utils/spaces";
import { Colors } from "../../styles";
import { KYCompletedSVG } from "../../assets/svg";
import { CustomText } from "../../components/atoms/Text";
import { backToDashboard, const_kyc_completed, thankuKYC } from "../../types/constants";
import FontStyles from "../../styles/FontStyles";
import Button from "../../components/atoms/Button";

const VerificationCompleted = () => {

    return(
        <View style={[GlobalStyles.flexOne,bgColor(Colors.white),GlobalStyles.viewCenter,pl(15),pr(15)]}>

            <KYCompletedSVG/>

            <CustomText title={const_kyc_completed} textStyle={[FontStyles.headingText,mt(20)]}/>

           <CustomText title={thankuKYC} textStyle={[FontStyles.subText,mt(30),GlobalStyles.textAlign]}/>

           
           <Button
        onPress={() => console.log('Press')}
        viewStyle={[mt(40),GlobalStyles.viewRow,GlobalStyles.viewCenter]} 
        title={backToDashboard}/>

        </View>
    )
}

export default React.memo(VerificationCompleted);