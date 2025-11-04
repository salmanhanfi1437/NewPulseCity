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
//fnwa9SZuTCy0bu3EAwPdkw:APA91bHiDe2K2tx4-gLEgmEqe3TEl9IwIZO85KBGBNa0nWvlvSOu0iBXBWaEZei7ekYQkMKV4re5oiItRC7zOEz8nK4veXPRYm2nhC4P4BrFr_Vfjfyf6B8
export default React.memo(Card);