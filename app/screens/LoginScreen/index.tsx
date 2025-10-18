import React, { useState,useRef, useEffect } from "react";
import { StyleSheet,View,ScrollView, Platform,TextInput } from "react-native";
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
import { OtpInput } from "react-native-otp-entry";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const LoginScreen = ({navigation} : LoginProps) => {

    const [mobileNumber,setMobileNo] = useState('');
    const [otp,setOtp] = useState('');
    const [isOtpVerified,setOtpVerified] = useState(false);
   const inputRef = useRef<TextInput>(null);

   useEffect(() =>{

    if(!isOtpVerified)
    {
        setTimeout(() => {
      handleFocus();
    }, 300); //
    }

   },[isOtpVerified]);

    const handleFocus = () => {
    inputRef.current?.focus(); // ✅ gives focus
  };
    
    const handleVerifyChange = () => {
        if(mobileNumber.length === 10)
        {
      if(isOtpVerified)
        {
            setOtpVerified(false)      
            setMobileNo(''),
            setOtp('')
            
        }else{
            setOtpVerified(true);
        }
        }      
    }

    return(
        
        <BackgroundPrimaryColor title="Welcome\nBack">
<KeyboardAwareScrollView
       style={styles.keyboardView}
    contentContainerStyle={{ flexGrow: 1 }}
    enableOnAndroid={true}
    extraScrollHeight={80}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
  >
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
            <View style={styles.mainCard}>

            <ViewRounded10 
            title={login}
            titleStyle={styles.loginText}
            containerStyle={styles.viewRound}
            disabled={false}/>

            <CustomText
            title={mobile_number}
            textStyle={styles.mobileText}></CustomText>

            <ViewOutlined
            viewStyle={styles.viewInput}>

            <CustomTextInput
            ref={inputRef}
            value={mobileNumber}
            onChangeText={setMobileNo}
            placeholder={'Mobile Number'}
             keyboardType="phone-pad"
             maxLength={10}
               editable={!isOtpVerified}j
            style={styles.txtinputStyle}></CustomTextInput>

            <CustomText title={isOtpVerified ? change : verify} 
            
            textStyle={[styles.verifyText,
            {color: mobileNumber.length != 10 ? Colors.grey_50 : isOtpVerified ? Colors.green : Colors.primaryColor}]} 
            underline={true} onPress={() => handleVerifyChange()}/>

            <MicSVG width={ms(30)} height={ms(30)}/>

            </ViewOutlined>
            
            {
                isOtpVerified && 

                <View>
                    
 <CustomText title={'Enter OTP'} textStyle={styles.mobileText}/>


            <OtpInput 
            numberOfDigits={4} 
            onTextChange={(text) => setOtp(text)}
            focusColor={Colors.primaryColor}
              autoFocus={true}
             placeholder="******"
             blurOnFilled={true}
               type="numeric"
            focusStickBlinkingDuration={500}
            onFocus={() => console.log("Focused")}
            onBlur={() => console.log("Blurred")}
            textInputProps={{
        accessibilityLabel: "One-Time Password"}}
        theme={{
    containerStyle: styles.otpView,
        }} />
                    </View>
            }    
           
         {
            otp?.length === 4 && 
               <ViewRounded10 title={login.toUpperCase()}
            titleStyle={[styles.loginText,{color:Colors.white}]}
            containerStyle={[styles.btnLogin,{backgroundColor:otp.length === 4 ? Colors.primaryColor : Colors.grey_50}]}
            disabled={otp.length === 4 ? false : true}/>
         }       
      
                    
            </View>
            </ScrollView>
                </KeyboardAwareScrollView>

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
        fontSize:ms(20),
        color:Colors.black,
        fontWeight:'700',
        alignSelf:'center',
        letterSpacing:ms(2)
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
    },
    otpView:{
        marginTop:mvs(20)
    },
 scrollContainer: {
    flexGrow: 1,
  },
  keyboardView:{
    flex:1,
    backgroundColor:Colors.white
  },
   btnLogin:{
        fontSize:ms(20),
        color:Colors.black,
        fontWeight:'700',
        alignSelf:'center',
        marginTop:mvs(40),
        ...Typography.weights.boldU,
        backgroundColor:Colors.primaryColor,
        width:'100%'
    },
    
})

export default React.memo(LoginScreen)