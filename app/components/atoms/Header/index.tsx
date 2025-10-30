import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../../../styles/GlobalStyles";
import { bgColor } from "../../../utils/spaces";
import colors from "../../../styles/colors";
import { StyleProp,ViewStyle } from "react-native";

type HeaderProps = {

    children?: React.ReactNode;
    style? : StyleProp<ViewStyle>;
}

const Header = ({children,style} : HeaderProps) => {

    return(
        <SafeAreaView style={[GlobalStyles.flexOne,bgColor(colors.color_E5E7EB),style]}>
        {children}
        </SafeAreaView>
    )
}

export default React.memo(Header);