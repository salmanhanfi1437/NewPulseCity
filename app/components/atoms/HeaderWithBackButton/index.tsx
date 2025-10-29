import React from "react";
import { View } from "native-base";
import GlobalStyles from "../../../styles/GlobalStyles";
import { bgColor, ml, pl, pr } from "../../../utils/spaces";
import { BackSVG } from "../../../assets/svg";
import { CustomText } from "../Text";
import FontStyles from "../../../styles/FontStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../styles";
import { mvs } from "react-native-size-matters";

type HeaderWithBackButtonProps = {
    title?: string;
    onPress? : () => void;
}

const HeaderWithBackButton = ({title,onPress} : HeaderWithBackButtonProps) => {

    return(
      
        <View style={[GlobalStyles.headerView,pl(mvs(10)),pr(mvs(10))]}>

            <View style={[GlobalStyles.positionAbsoulute,pl(mvs(10))]}>    
            <BackSVG/>
            </View>
            <CustomText title={title} textStyle={[FontStyles.headingText,GlobalStyles.textAlign]}/>
        </View> 
        
    )
}

export default React.memo(HeaderWithBackButton);