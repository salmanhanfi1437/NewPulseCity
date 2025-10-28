import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import { LoginProps } from "../../navigation/types";
import { ms, mvs } from 'react-native-size-matters';
import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import { Colors, Typography } from "../../styles";
import ViewRounded10 from "../../components/atoms/ViewRounded10";
import { change, login, loginOrSignup, mobile_number, resendOtp, resendOtpTimer, verify, welcome_to_zuvy } from "../../types/constants";
import { CustomText } from '../../components/atoms/Text';
import ViewOutlined from "../../components/atoms/ViewOutlined";
import CustomTextInput from '../../components/atoms/TextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OtpInput } from "react-native-otp-entry";
import Button from "../../components/atoms/Button";
import PressableOpacity from "../../components/atoms/PressableOpacity";
import { useTranslation } from "react-i18next";
import GlobalStyles from "../../styles/GlobalStyles";
import { flexGrow, mt } from "../../utils/spaces";

const LoginScreen = ({ navigation }: LoginProps) => {
    const [mobileNumber, setMobileNo] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setOtpVerified] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const [timer, setTimer] = useState(30);

    const {t} = useTranslation();

    // show the timer after mobile number added
    useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

    // Focus input after OTP verification
    useEffect(() => {
        if (!isOtpVerified) {
            setTimeout(() => handleFocus(), 300);
        }
    }, [isOtpVerified]);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const handleVerifyChange = () => {
        if (mobileNumber.length === 10) {
            if (isOtpVerified) {
                setOtpVerified(false);
                setMobileNo('');
                setOtp('');
                setTimer(30);
            } else {
                setOtpVerified(true);
               

            }
        }
    };

   

const loginPress = () => {
    console.log('login Press')
    navigation.replace('merchantTabs');
}

    return (
        <BackgroundPrimaryColor title={welcome_to_zuvy}>
          

           <KeyboardAwareScrollView
                          style={GlobalStyles.keyboardView}
                          contentContainerStyle={flexGrow(1)}
                          enableOnAndroid={true}
                          extraScrollHeight={80}
                          keyboardShouldPersistTaps="handled"
                          showsVerticalScrollIndicator={false}>

                            <ScrollView
                                                contentContainerStyle={flexGrow(1)}
                                                keyboardShouldPersistTaps="handled"
                                                showsVerticalScrollIndicator={false}>
                        <ViewRounded10
                            title={t(loginOrSignup)}
                            titleStyle={styles.loginText}
                            containerStyle={GlobalStyles.viewRound}
                            disabled={false}/>

                        <CustomText title={t(mobile_number)} textStyle={styles.mobileText} />

                        <ViewOutlined viewStyle={styles.viewInput}>

                        <CustomText title={"+91 |"} textStyle={GlobalStyles.headingText} />

                            <CustomTextInput
                                ref={inputRef}
                                value={mobileNumber}
                                onChangeText={setMobileNo}
                                placeholder={t(mobile_number)}
                                keyboardType="phone-pad"
                                maxLength={10}
                                editable={!isOtpVerified}
                                style={GlobalStyles.txtInput}
                            />

                            <CustomText
                                title={isOtpVerified ? t("change") : t("verify")}
                                textStyle={[
                                    styles.verifyText,
                                    {
                                        color:
                                            mobileNumber.length != 10
                                                ? Colors.grey_50
                                                : isOtpVerified
                                                    ? Colors.green
                                                    : Colors.primaryColor,
                                    },
                                ]}
                                underline={true}
                                onPress={() => handleVerifyChange()}
                            />

                            {/* <TouchableOpacity>
                                <MicSVG width={ms(30)} height={ms(30)} />
                                {isListening && <Text style={{ color: 'green', fontSize: 12 }}>Listening...</Text>}
                            </TouchableOpacity> */}
                        </ViewOutlined>

                        <PressableOpacity onPress={()=>{

                            navigation.navigate('signup')
                        }}>        
                       <CustomText title={"Sign up"} textStyle={styles.signupText} underline={true}/>
                          </PressableOpacity>          

                        {isOtpVerified && (
                            <View>
                                <CustomText title={t("enterOTP")} textStyle={[GlobalStyles.headingText]} />

                                <OtpInput
                                    numberOfDigits={6}
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
                                        accessibilityLabel: "One-Time Password"
                                    }}
                                    theme={{
                                        containerStyle: styles.otpView,
                                    }}/>

                                  {(timer > 0 && isOtpVerified) ? (
            <CustomText textStyle={[GlobalStyles.headingText,GlobalStyles.textAlign,mt(15)]}   
             title={t(resendOtpTimer, { time: `00:${timer < 10 ? `0${timer}` : timer}s` })}/>
        ) : (
                <CustomText textStyle={[GlobalStyles.headingText,GlobalStyles.flexEnd,GlobalStyles.colorPrimary,mt(10)]} onPress={() => setTimer(30)} title={t(resendOtp)} underline={true} />)}  
                            </View>
                        )}

                        {otp?.length === 6 && (
                            <Button
                                title={t("continue")}
                                onPress={loginPress}
                                viewStyle={styles.btnLogin}
                                disabled={otp.length === 6 ? false : true}
                            />
                        )}     
                        </ScrollView>
                        </KeyboardAwareScrollView>       
        </BackgroundPrimaryColor>
    );
};

const styles = StyleSheet.create({
    mainCard: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: ms(30),
        borderTopRightRadius: ms(30),
        padding: mvs(15),
        height: '100%',
    },
    
    loginText: {
        fontSize: ms(20),
        color: Colors.black,
        fontWeight: '700',
        alignSelf: 'center',
        letterSpacing: ms(2),
    },
    mobileText: {
        fontSize: ms(20),
        color: Colors.black,
        fontWeight: '700',
        ...Typography.weights.mediumU,
        marginTop: mvs(30),
    },
     mobileNumberText: {
        textAlign:'center'
    },
    signupText: {
        fontSize: ms(16),
        color: Colors.primaryColor,
        fontWeight: '800',
        alignSelf:'flex-end',
        marginTop:mvs(10),
        ...Typography.weights.boldU,
    },
    viewInput: {
        marginTop: mvs(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
   
    verifyText: {
        marginRight: mvs(5),
        color: Colors.primaryColor,
        alignSelf: 'center',
        fontSize: ms(15),
        ...Typography.weights.boldU,
        fontWeight: '700',
    },
    otpView: {
        marginTop: mvs(10),
    },
    
    btnLogin: {
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: mvs(40),
        width: '100%',
    },
   
});

export default React.memo(LoginScreen);