import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { LoginProps } from "../../navigation/types";
import { ms, mvs } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OtpInput } from "react-native-otp-entry";

import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import ViewRounded10 from "../../components/atoms/ViewRounded10";
import ViewOutlined from "../../components/atoms/ViewOutlined";
import CustomTextInput from "../../components/atoms/TextInput";
import { CustomText } from "../../components/atoms/Text";
import Button from "../../components/atoms/Button";
import PressableOpacity from "../../components/atoms/PressableOpacity";

import { Colors, Typography } from "../../styles";
import GlobalStyles from "../../styles/GlobalStyles";
import FontStyles from "../../styles/FontStyles";
import { flexGrow, mt } from "../../utils/spaces";
import {
    const_continue,
  loginOrSignup,
  mobile_number,
  resendOtp,
  resendOtpTimer,
  welcomeZuvy,
} from "../../types/constants";

const RESEND_TIMER = 30;

const LoginScreen = ({ navigation }: LoginProps) => {
  const { t } = useTranslation();

  const [mobileNumber, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMER);

  const inputRef = useRef<TextInput>(null);

  // 🔁 Countdown timer logic
  useEffect(() => {
    if (!isOtpVerified || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
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

  // ✅ Toggle between verify/change state
  const handleVerifyToggle = useCallback(() => {
    if (mobileNumber.length !== 10) return;

    if (isOtpVerified) {
      // Reset to initial state
      setOtpVerified(false);
      setMobileNo("");
      setOtp("");
      setTimer(RESEND_TIMER);
    } else {
      setOtpVerified(true);
      setTimer(RESEND_TIMER);
    }
  }, [mobileNumber, isOtpVerified]);

  const handleLogin = useCallback(() => {
    console.log("Login pressed");
    navigation.replace("merchantTabs");
  }, [navigation]);

  const handleResendOtp = useCallback(() => {
    setTimer(RESEND_TIMER);
  }, []);

  return (
    <BackgroundPrimaryColor title={t(welcomeZuvy)}>
     
          {/* 🔹 Header Card */}
          <ViewRounded10
            title={loginOrSignup}
            titleStyle={[FontStyles.headingText]}
            containerStyle={[GlobalStyles.viewRound,GlobalStyles.viewCenter,mt(15)]}
          />

          {/* 🔹 Mobile Input */}
          <CustomText title={t(mobile_number)} textStyle={styles.mobileText} />

          <ViewOutlined viewStyle={styles.viewInput}>
            <CustomText title="+91 |" textStyle={FontStyles.headingText} />

            <CustomTextInput
              ref={inputRef}
              value={mobileNumber}
              onChangeText={setMobileNo}
              placeholder={t(mobile_number)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={!isOtpVerified}
              style={FontStyles.txtInput}
            />

            <CustomText
              title={isOtpVerified ? t("change") : t("verify")}
              textStyle={[
                styles.verifyText,
                {
                  color:
                    mobileNumber.length !== 10
                      ? Colors.grey_50
                      : isOtpVerified
                      ? Colors.green
                      : Colors.primaryColor,
                },
              ]}
              underline
              onPress={handleVerifyToggle}
            />
          </ViewOutlined>

          {/* 🔹 Sign up redirect */}
          <PressableOpacity onPress={() => navigation.navigate("signup")}>
            <CustomText
              title="Sign up"
              textStyle={styles.signupText}
              underline
            />
          </PressableOpacity>

          {/* 🔹 OTP Section */}
          {isOtpVerified && (
            <View>
              <CustomText
                title={t("enterOTP")}
                textStyle={FontStyles.headingText}
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
                  accessibilityLabel: "One-Time Password",
                }}
                theme={{
                  containerStyle: styles.otpView,
                }}
              />

              {timer > 0 ? (
                <CustomText
                  textStyle={[
                    FontStyles.headingText,
                    GlobalStyles.textAlign,
                    mt(15),
                  ]}
                  title={t(resendOtpTimer, {
                    time: `00:${timer < 10 ? `0${timer}` : timer}s`,
                  })}
                />
              ) : (
                <CustomText
                  textStyle={[
                    FontStyles.headingText,
                    GlobalStyles.flexEnd,
                    GlobalStyles.colorPrimary,
                    mt(10),
                  ]}
                  onPress={handleResendOtp}
                  title={t(resendOtp)}
                  underline
                />
              )}
            </View>
          )}

          {/* 🔹 Continue Button */}
          {otp.length === 6 && (
            <Button
              title={const_continue}
              onPress={handleLogin}
              viewStyle={[styles.btnLogin,GlobalStyles.viewCenter]}
            />
          )}
    </BackgroundPrimaryColor>
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  loginText: {
    fontSize: ms(20),
    color: Colors.black,
    fontWeight: "700",
    alignSelf: "center",
    letterSpacing: ms(2),
  },
  mobileText: {
    fontSize: ms(20),
    color: Colors.black,
    fontWeight: "700",
    ...Typography.weights.mediumU,
    marginTop: mvs(30),
  },
  signupText: {
    fontSize: ms(16),
    color: Colors.primaryColor,
    fontWeight: "800",
    alignSelf: "flex-end",
    marginTop: mvs(10),
    ...Typography.weights.boldU,
  },
  viewInput: {
    marginTop: mvs(10),
    flexDirection: "row",
    alignItems: "center",
  },
  verifyText: {
    marginRight: mvs(5),
    color: Colors.primaryColor,
    alignSelf: "center",
    fontSize: ms(15),
    ...Typography.weights.boldU,
    fontWeight: "700",
  },
  otpView: {
    marginTop: mvs(10),
  },
  btnLogin: {
    fontWeight: "700",
    alignSelf: "center",
    marginTop: mvs(40),
    width: "100%",
  },
});
