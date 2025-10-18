import React, { useState } from "react";
import { StyleSheet,View,Text } from "react-native";
import { LoginProps } from "../../navigation/types";
import { ms, mvs } from 'react-native-size-matters';
import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import { Colors, Typography } from "../../styles";
import ViewRounded10 from "../../components/atoms/ViewRounded10";
import { change, login, mobile_number, verify } from "../../types/constants";
import { CustomText } from '../../components/atoms/Text'
import ViewOutlined from "../../components/atoms/ViewOutlined";
import CustomTextInput from '../../components/atoms/TextInput';
import { MicSVG } from "../../assets/svg";


const LoginScreen = ({navigation} : LoginProps) => {

    const [mobileNumber,setMobileNo] = useState('');
    const [otp,setOtp] = useState('');
    const [isOtpVerified,setOtpVerified] = useState(false);

    const handleVerifyChange = () => {
        if(mobileNumber.length === 10)
        {
  if(isOtpVerified)
        {
            setOtpVerified(false)
        }else{
            setOtpVerified(true);
        }
        }
      
    }

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

            <ViewOutlined
            viewStyle={styles.viewInput}>

            <CustomTextInput
            value={mobileNumber}
            onChangeText={setMobileNo}
            placeholder={'Mobile Number'}
             keyboardType="phone-pad"
             maxLength={10}
             editable={isOtpVerified ? false : true}
            style={styles.txtinputStyle}></CustomTextInput>

            <CustomText title={isOtpVerified ? change : verify} 
            
             textStyle={[styles.verifyText,{color: mobileNumber.length != 10 ? Colors.grey_50 : isOtpVerified ? Colors.green : Colors.primaryColor}]} 
            underline={true} onPress={() => handleVerifyChange()}/>

            <MicSVG width={ms(30)} height={ms(30)}/>

            </ViewOutlined>
           


            
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
    },
    viewInput:{
        marginTop:mvs(10),
        flexDirection:'row',
      alignItems: 'center',
    },
    txtinputStyle : {

        fontSize:ms(15),
        color:Colors.black,
        fontWeight:'500',
        flex:1,
        ...Typography.weights.mediumU,
    },
    verifyText:{
        marginRight:mvs(5),
        color:Colors.primaryColor,
        alignSelf:'center',
        fontSize:ms(15),
        ...Typography.weights.boldU,
        fontWeight:'700'
    }
    
})

export default React.memo(LoginScreen)