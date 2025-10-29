import React from 'react';
import {View,StyleSheet, ViewStyle, StyleProp} from 'react-native';
import { ms } from 'react-native-size-matters';
import { Colors } from '../../../styles';


type viewOutlinedProps = {
    children? : React.ReactNode;
    viewStyle? : StyleProp<ViewStyle>
}

const ViewOutlined : React.FC<viewOutlinedProps> = ({children,viewStyle}) =>{

    return(
    <View style={[styles.container,viewStyle]}>
        {children}
    </View>
    )
} 

const styles = StyleSheet.create({

    container : {
        borderRadius:ms(30),
        borderWidth:ms(1),
        borderColor:Colors.borderColor,
        paddingStart:ms(5),
        paddingEnd:ms(5),
        height:ms(50)
    }
})

export default React.memo(ViewOutlined);