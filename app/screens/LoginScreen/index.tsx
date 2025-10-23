import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, ScrollView, Platform, TextInput, PermissionsAndroid, TouchableOpacity, Text, Pressable } from "react-native";
import { LoginProps } from "../../navigation/types";
import { ms, mvs } from 'react-native-size-matters';
import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import { Colors, Typography } from "../../styles";
import ViewRounded10 from "../../components/atoms/ViewRounded10";
import { change, login, mobile_number, verify, welcome_to_zuvy } from "../../types/constants";
import { CustomText } from '../../components/atoms/Text';
import ViewOutlined from "../../components/atoms/ViewOutlined";
import CustomTextInput from '../../components/atoms/TextInput';
import { MicSVG } from "../../assets/svg";
import { OtpInput } from "react-native-otp-entry";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Voice from '@react-native-voice/voice';
import Button from "../../components/atoms/Button";
import PressableOpacity from "../../components/atoms/PressableOpacity";

const LoginScreen = ({ navigation }: LoginProps) => {
    const [mobileNumber, setMobileNo] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setOtpVerified] = useState(false);
    const [isListening, setIsListening] = useState(false);
    

    const inputRef = useRef<TextInput>(null);



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
            } else {
                setOtpVerified(true);
            }
        }
    };

   

const loginPress = () => {
    console.log('login Press')
}

    return (
        <BackgroundPrimaryColor title={welcome_to_zuvy}>
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
                            disabled={false}
                        />

                        <CustomText title={mobile_number} textStyle={styles.mobileText} />

                        <ViewOutlined viewStyle={styles.viewInput}>

                        <CustomText title={"+91 |"} textStyle={styles.mobileNumberText} />

                            <CustomTextInput
                                ref={inputRef}
                                value={mobileNumber}
                                onChangeText={setMobileNo}
                                placeholder={'Mobile Number'}
                                keyboardType="phone-pad"
                                maxLength={10}
                                editable={!isOtpVerified}
                                style={styles.txtinputStyle}
                            />

                            <CustomText
                                title={isOtpVerified ? change : verify}
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

                            <TouchableOpacity>
                                <MicSVG width={ms(30)} height={ms(30)} />
                                {isListening && <Text style={{ color: 'green', fontSize: 12 }}>Listening...</Text>}
                            </TouchableOpacity>
                        </ViewOutlined>

                        <PressableOpacity onPress={()=>{
                            console.log('111'),
                            navigation.navigate('signup')
                        }}>        
                       <CustomText title={"Sign up"} textStyle={styles.signupText} underline={true}/>
                          </PressableOpacity>          

                        {isOtpVerified && (
                            <View>
                                <CustomText title={'Enter OTP'} textStyle={styles.mobileText} />

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
                                        accessibilityLabel: "One-Time Password"
                                    }}
                                    theme={{
                                        containerStyle: styles.otpView,
                                    }}
                                />
                            </View>
                        )}

                        {otp?.length === 4 && (
                            <Button
                                title={login.toUpperCase()}
                                onPress={loginPress}
                                viewStyle={styles.btnLogin}
                                disabled={otp.length === 4 ? false : true}
                            />
                        )}
                    </View>
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
    viewRound: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
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
        fontSize: ms(20),
        color: Colors.black,
        fontWeight: '700',
        ...Typography.weights.boldU,
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
    txtinputStyle: {
        fontSize: ms(15),
        color: Colors.black,
        fontWeight: '500',
        flex: 1,
        ...Typography.weights.mediumU,
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
    keyboardView: {
        flex: 1,
        backgroundColor: Colors.white,
          borderTopLeftRadius:ms(30),
            borderTopRightRadius:ms(30)
    },
    btnLogin: {
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: mvs(40),
        backgroundColor: Colors.primaryColor,
        width: '100%',
    },
   
});

export default React.memo(LoginScreen);