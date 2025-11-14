import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Alert,
  Text,
} from "react-native";
import { LoginProps } from "../../navigation/types";
import { ms, mvs } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OtpInput } from "react-native-otp-entry";

import BackgroundPrimaryColor from '../../components/atoms/BackgroundPrimaryColor';
import ViewRounded10 from '../../components/atoms/ViewRounded10';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import CustomTextInput from '../../components/atoms/TextInput';
import { CustomText } from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import PressableOpacity from '../../components/atoms/PressableOpacity';
import { Colors, Typography } from "../../styles";
import GlobalStyles from '../../styles/GlobalStyles';
import FontStyles from '../../styles/FontStyles';
import {
  bgColor,
  mt,
  fS,
  height,
  bR,
  tAlign,
  fontColor,
  pl,
  pr,
  fontW,
  mb,
} from '../../utils/spaces';
import {
  const_continue,
  const_fcmToken,
  const_login,
  const_RESET_STORE,
  login,
  loginOrSignup,
  mobile_number,
  resendOtp,
  resendOtpTimer,
  signup,
  validEmail,
  validMobileNumber,
  verify,
  welcomeZuvy,
  yourCart,
} from '../../types/constants';
import colors from '../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';
import { resetOTPState, sendOTPFailure, sendOTPRequest, verifyOTPRequest } from './loginSlice';
import secureStorage from '../../utils/secureStorage';
import { isValidIndianMobile } from '../../utils/helper';

const RESEND_TIMER = 30;

const LoginScreen = ({ navigation }: LoginProps) => {
  const { marginBottom, ...restBTNStyle } = GlobalStyles.Custombutton;

  const { t } = useTranslation();

  const [mobileNumber, setMobileNo] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setOtpVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMER);
  const { otpData, error, verifyOTPData, otpError } = useSelector(
    (state: RootState) => state.sendOtp,
  );
  const inputRef = useRef<TextInput>(null);
  const dispatch = useDispatch();
  
  // 🔁 Countdown timer logic
  useEffect(() => {
    if (!isOtpVerified || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isOtpVerified]);

  // 🎯 Auto-focus on mobile input
  useEffect(() => {
    if (!isOtpVerified) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOtpVerified]);


  useEffect(() => {
  if (otpData || error) {
    console.log("OTPData changed: ", otpData, "Error:", error);

    if(otpData?.success === true)
    {
      Alert.alert(otpData?.message)
      setOtpVerified(true);
      setTimer(RESEND_TIMER);
      if(otpData?.data?.userMObileRegister == false)
      {
      dispatch({ type: const_RESET_STORE });

      }
      //Alert.alert(otpData?.data)
    }
  }
}, [otpData, error]);


useEffect(() => {
  if (!verifyOTPData && !otpError) return;

  console.log('MainverifyOTPResponse:', verifyOTPData, 'Error:', otpError);

  if (verifyOTPData?.success === true) {
    showAlert(
      verifyOTPData?.message,
      'Success',
      () => {
        dispatch({ type: const_RESET_STORE }); // 🔄 अब dispatch callback में है
        if (verifyOTPData?.data?.isRegistered === false) {
          resetState();
          navigation.navigate('signup', { mobile: mobileNumber });
        } else {
          navigation.replace('merchantTabs');
        }
      }
    );
  } else if (otpError?.message) {
    showAlert(otpError.message, 'Error');
    dispatch({ type: const_RESET_STORE }); // ❗ dispatch सिर्फ error पर भी एक बार
  }
}, [verifyOTPData, otpError]);


  const handleVerifyToggle = useCallback(() => {
    if (mobileNumber.length !== 10) return;
  

    if(otp.length === 6)
    {
      verifyOTP()
    }
    else if(!isValidIndianMobile(mobileNumber))
    {
      showAlert(t(validMobileNumber))
    }
    else if (isOtpVerified) {
      // Reset to initial state
      setOtpVerified(false);
      setMobileNo('');
      setOtp('');
      setTimer(RESEND_TIMER);
    } else{
       sendOTP()
    }
  }, [mobileNumber, isOtpVerified,otp]);

 const sendOTP = async () => {
  try {

dispatch(sendOTPRequest(mobileNumber)); // ✅ only send the mobile
  } catch (error: any) {
    dispatch(sendOTPFailure('Failed to send OTP'));
    showAlert('Failed to send OTP, please try again');
  }
};

 const verifyOTP = async () => {
  try {
    const fcmToken = await secureStorage.getItem(const_fcmToken);
    

dispatch(verifyOTPRequest({ mobile: mobileNumber, otp,fcmToken,deviceType:Platform.OS.toUpperCase(),purpose : login.toUpperCase() }));
  } catch (error: any) {
    dispatch(sendOTPFailure('Failed to send OTP'));
    Alert.alert('Failed to send OTP, please try again');
  }
};

  const handleResendOtp = useCallback(() => {
    setTimer(RESEND_TIMER);
    sendOTP();
  }, []);

  const handleNavigation = () =>{
    resetState();
    navigation.navigate('signup',{mobile : mobileNumber});
  }

  const resetState = () => {
    setMobileNo('')
    setOtp('')
    setOtpVerified(false)
  }

  return (
    <BackgroundPrimaryColor title={t(welcomeZuvy)}>
      {/* 🔹 Header Card */}
      {/* <TouchableOpacity
        onPress={handleNavigation}
        activeOpacity={2}
      >
        <ViewRounded10
          title={loginOrSignup}
          titleStyle={[fS(ms(15))]}
          containerStyle={[
            GlobalStyles.viewRound,
            GlobalStyles.viewCenter,
            mt(15),
            bgColor(Colors.fadeWhite),
          ]}
        />
      </TouchableOpacity> */}

      <CustomText textStyle={[styles.mobileText,GlobalStyles.textAlign,mt(20)]} title={t(const_login)}></CustomText>

      {/* 🔹 Mobile Input */}
      <CustomText title={t(mobile_number)} textStyle={styles.mobileText} />

      <ViewOutlined viewStyle={styles.viewInput}>
        <CustomText
          title="+91 |"
          textStyle={[FontStyles.headingText, fS(ms(18)), pl(12), fontW('600')]}
        />

        <CustomTextInput
          ref={inputRef}
          value={mobileNumber}
          onChangeText={setMobileNo}
          placeholder={t(mobile_number)}
          keyboardType="phone-pad"
          maxLength={10}
          editable={!isOtpVerified}
          style={[FontStyles.txtInput, fS(15)]}
        />
      </ViewOutlined>

      {/* 🔹 OTP Section */}
      {isOtpVerified && (
        <View>
          <CustomText
            title={t('enterOTP')}
            textStyle={[FontStyles.headingText, fS(ms(20)), mt(ms(15))]}
          />

          <OtpInput
            numberOfDigits={6}
            onTextChange={setOtp}
            focusColor={Colors.primaryColor}
            autoFocus
            placeholder="******"
            blurOnFilled
            type="numeric"
            focusStickBlinkingDuration={500}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: styles.otpView,
              pinCodeContainerStyle:
                (GlobalStyles.zuvyProfileImg, height(ms(40))),
              placeholderTextStyle: fS(ms(15)),
              pinCodeTextStyle: fS(ms(15)),
            }}
          />

          {timer > 0 ? (
            <CustomText
              textStyle={[styles.txtTimer, fS(ms(12))]}
              title={t(resendOtpTimer, {
                time: `00:${timer < 10 ? `0${timer}` : timer}`,
              })}
            />
          ) : (
            <CustomText
              textStyle={[
                FontStyles.headingText,
                GlobalStyles.flexEnd,
                GlobalStyles.colorPrimary,
                mt(10),
                fS(ms(14)),
              ]}
              onPress={handleResendOtp}
              title={t(resendOtp)}
            />
          )}
        </View>
      )}

      {/* 🔹 Continue Button */}

      <Button
        disabledBtn={
          (!isOtpVerified && mobileNumber.length !== 10) ||
          (isOtpVerified && otp.length !== 6)
        }
        title={isOtpVerified ? t(verify) : t(const_continue)}
        onPress={handleVerifyToggle}
        titleStyle={[fS(ms(16)), fontColor(colors.black)]}
        viewStyle={[
          restBTNStyle,
          mt('20%'),
          bR(10),
          mb(10),
          height(60),
          ((!isOtpVerified && mobileNumber.length !== 10) ||
            (isOtpVerified && otp.length !== 6)) && { opacity: 0.5 },
          GlobalStyles.authBtn,
        ]}
      />
    </BackgroundPrimaryColor>
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  loginText: {
    fontSize: ms(20),
    color: Colors.black,
    fontWeight: '700',
    alignSelf: 'center',
    letterSpacing: ms(2),
  },
  mobileText: {
    fontSize: ms(18),
    color: Colors.black,
    fontWeight: '600',
    ...Typography.weights.mediumU,
    marginTop: mvs(30),
  },
  txtTimer: {
    ...FontStyles.headingText,
    ...GlobalStyles.textAlign,
    marginTop: mvs(20),
  },
  signupText: {
    fontSize: ms(16),
    color: Colors.primaryColor,
    fontWeight: '800',
    alignSelf: 'flex-end',
    marginTop: mvs(10),
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
    // justifyContent:"center"
    alignItems: 'center',
    alignContent: 'center',
  },
  btnLogin: {
    ...GlobalStyles.alignItem,
    marginTop: mvs(30),
  },
});
