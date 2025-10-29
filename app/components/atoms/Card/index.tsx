import React from "react";
import { StyleProp, StyleSheet,View, ViewStyle } from "react-native";
import GlobalStyles from "../../../styles/GlobalStyles";


type CardProps = {
    children? : React.ReactNode;
    style? : StyleProp<ViewStyle>;
}


const Card = ({children,style} : CardProps) => {
        return(
            <View style={[GlobalStyles.cardView,style]}>
                {children}
            </View>
        )
}

export default React.memo(Card);