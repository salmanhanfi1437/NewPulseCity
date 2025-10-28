import React from "react";
import { StyleSheet, View } from "react-native";
import { ms, ViewStyle } from "react-native-size-matters";
import PressableOpacity from "../../components/atoms/PressableOpacity";
import { Colors } from "../../styles";
import colors from "../../styles/colors";


type CheckBoxProps = {
    style?: ViewStyle;
    onPress?: () => void;
    isChecked? : boolean;
}


    const CheckBox = ({style,onPress,isChecked} : CheckBoxProps) => {

        return(
            <PressableOpacity style={[style]} onPress={onPress}>
             <View style={[styles.box,{backgroundColor: isChecked ? Colors.primaryColor : colors.white}]}/>   
            </PressableOpacity>
        )

    }

const styles = StyleSheet.create({
     box: {
    borderWidth: ms(2),
    borderRadius: ms(20/2),
    width:ms(20),
    height:ms(20),
    borderColor:Colors.color_E5E7EB
  }
})

 export default React.memo(CheckBox);   