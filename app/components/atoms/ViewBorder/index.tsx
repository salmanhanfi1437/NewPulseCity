import React, { Children } from "react";
import { StyleProp, StyleSheet,View,ViewStyle } from "react-native";
import GlobalStyles from "../../../styles/GlobalStyles";
import PressableOpacity from "../PressableOpacity";

type ViewBorderProps = {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

const ViewBorder = ({children,style,onPress} :ViewBorderProps) => {
return (
        <PressableOpacity onPress={onPress}>
        <View style={[GlobalStyles.viewBorder,style]}>
            {children}
        </View>
        </PressableOpacity>
    )
}


export default React.memo(ViewBorder);