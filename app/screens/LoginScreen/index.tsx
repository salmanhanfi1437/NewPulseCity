import React, { useState } from "react";
import { StyleSheet,View,Text } from "react-native";
import { LoginProps } from "../../navigation/types";
import { ms, mvs } from 'react-native-size-matters';
import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import { Colors, Typography } from "../../styles";
import ViewRounded10 from "../../components/atoms/ViewRounded10";
import { login, mobile_number } from "../../types/constants";
import { CustomText } from '../../components/atoms/Text'

const LoginScreen = ({navigation} : LoginProps) => {

    const [mobileNumber,setMobileNo] = useState('');
    const [otp,setOtp] = useState('');

    return(
        <BackgroundPrimaryColor title="Welcome\nBack">

            <View style={styles.mainCard}>

            <ViewRounded10 title={login}
            titleStyle={styles.loginText}
            containerStyle={styles.viewRound}
            disabled={false}/>

            <CustomText
            title={mobile_number}
            textStyle={styles.mobileText}></CustomText>


           


            
            </View>


        </BackgroundPrimaryColor>
    )
}

const styles = StyleSheet.create({
    mainCard : {
        backgroundColor:Colors.white,
        borderTopLeftRadius : ms(30),
        borderTopRightRadius : ms(30),
       padding:mvs(15),
        height:'100%'
    },
    viewRound:{
        backgroundColor:Colors.white,
        justifyContent:'center',
    },
    loginText:{
        fontSize:ms(12),
        color:Colors.black,
        fontWeight:'500',
        alignSelf:'center'
    },
    mobileText : {
        fontSize:ms(15),
        color:Colors.black,
        fontWeight:'500',
        ...Typography.weights.mediumU,
        marginTop:mvs(20)
    }
    
})

export default React.memo(LoginScreen)