import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../../../styles/GlobalStyles";
import { bgColor } from "../../../utils/spaces";
import colors from "../../../styles/colors";

type HeaderProps = {

    children?: React.ReactNode;
}

const Header = ({children} : HeaderProps) => {

    return(
        <SafeAreaView style={[GlobalStyles.flexOne,bgColor(colors.color_E5E7EB)]}>
        {children}
        </SafeAreaView>
    )
}

export default React.memo(Header);