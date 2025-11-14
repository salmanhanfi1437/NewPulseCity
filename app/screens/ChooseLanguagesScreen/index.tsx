import React, { useEffect, useState,useCallback  } from "react";
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Platform, AppState ,Linking, Alert,PermissionsAndroid } from "react-native";
import { ms, mvs } from "react-native-size-matters";
import { ChooseLanguagesProps } from "../../navigation/types";
import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import { useTranslation } from "react-i18next";
import GlobalStyles from "../../styles/GlobalStyles";
import { CustomText } from "../../components/atoms/Text";
import Checkbox from "../Checkbox";
import ViewBorder from "../../components/atoms/ViewBorder";
import FontStyles from "../../styles/FontStyles";
import DeviceInfo from 'react-native-device-info';
import { useFocusEffect } from '@react-navigation/native';


import {
  mt,
  borderRadius,
  fS,
  height,
  bR,
  tAlign,
  fontColor,
  pl,
  pr,
  paddingH,
  alignCenter,
} from '../../utils/spaces';
import {
  choose_language_title,
  const_authToken,
  const_continue,
  const_fcmToken,
  const_new_update,
  const_RESET_STORE,
  const_update_message,
  select_your_language,
  yourCart,
} from "../../types/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import Button from "../../components/atoms/Button";
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import secureStorage from "../../utils/secureStorage";
import colors from "../../styles/colors";
import { Colors } from "../../styles";
import { fetchAppVersion } from "./chooseLanguageSlice";
import { showAlert } from "../../components/atoms/AlertBox/showAlert";

// import RazorpayCheckout from 'react-native-razorpay';

const ChooseLanguages = ({ navigation }: ChooseLanguagesProps) => {
  const languages = [
    { code: 'en', label: 'English', title: 'English' },
    { code: 'hi', label: 'हिन्दी', title: 'Hindi' },
    { code: 'te', label: 'తెలుగు', title: 'Telugu' },
    { code: 'bn', label: 'বাংলা', title: 'Bengali' },
  ];

  const [selectedLang, setSelectedLang] = useState('en');
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const { appVersionData, error } = useSelector((state: RootState) => state.chooseLanguage);


  useEffect(() => {
  const subscription = AppState.addEventListener("change", state => {
    if (state === "active") {
      checkForceUpdate();
    }
  });
 return () => subscription.remove();
}, [appVersionData]);

 const checkForceUpdate = () => {
  if (!appVersionData) return;

  const appVersion = DeviceInfo.getVersion();
  const latestVersion = appVersionData?.data?.androidVersion;
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=ai.zuvystore.com";

  if (latestVersion > appVersion) {
    showAlert(
      t(const_new_update),       // Title
      t(const_update_message),   // Message
      () => {
        Linking.openURL(playStoreUrl);
      }
    );
  }
};

  useEffect(() => {
    console.log('Dispatch')
    dispatch(fetchAppVersion())
  },[])
  

 useFocusEffect(
  useCallback(() => {
    checkForceUpdate();
  }, [appVersionData])
);
  async function requestNotificationPermission() {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('✅ Notification permission granted');
        
      } else {
        Alert.alert('Permission denied', 'You won’t receive notifications.');
        console.log('❌ Notification permission denied');
        requestNotificationPermission()
        return false;
      }
    } else {
      console.log('✅ Android version < 13, no need to request POST_NOTIFICATIONS');
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  } catch (err) {
    console.error('Permission error:', err);
    return false;
  }
}



useEffect(() => {
  const checkFCM = async () => {
    // Enable crash reporting for debug mode
crashlytics().setCrashlyticsCollectionEnabled(true);


    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) return;

    try {
      const token = await messaging().getToken();
      console.log('✅ FCM Token:', token);
      if (token) {
        secureStorage.setItem(const_fcmToken,token);
        //Alert.alert('FCM Works!', `Token: ${token.substring(0, 10)}...`);
      } else {
        showAlert('❌ No FCM token retrieved');
      }
    } catch (error) {
      console.error('❌ FCM Error:', error);
      showAlert('FCM Error', error?.message);
    }
  };

  checkFCM();
}, []);


useEffect(() =>{
  dispatch({ type: const_RESET_STORE });
},[])


  const handleLanguageschanges = (item: any) => {
    setSelectedLang(item.code);
    i18n.changeLanguage(item.code);
  };

  const renderItem = ({ item }: any) => (
    <ViewBorder
      style={[GlobalStyles.viewRow, mt(15), borderRadius(10)]}
      onPress={() => handleLanguageschanges(item)}>
      <View style={[GlobalStyles.flexOne, paddingH(20)]}>
        <CustomText textStyle={[FontStyles.headingText]} title={item.label} />
        <CustomText
          textStyle={[
            FontStyles.subText,
            { color: colors.semiLight_grey },
            fS(11),
            fontColor(Colors.textColorGrey),
          ]}
          title={item.title}
        />
      </View>
      <Checkbox isChecked={item.code === selectedLang} />
    </ViewBorder>
  );

  const onHandleOnPress = async() => {
  
//     crashlytics().log('Crashlytics debug test started');
// crashlytics().crash(); // Force a crash
    const token = await secureStorage.getItem(const_authToken);
    if(token)
      navigation.replace('merchantTabs')
    else
    navigation.navigate("OnBoard");
  };

  return (
    <BackgroundPrimaryColor
      title={select_your_language}
      subTitle={choose_language_title}
      GrillVisible={false}
    >
      <KeyboardAvoidingView
        style={GlobalStyles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={mvs(60)} // adjust if needed
      >
        <View
          style={[GlobalStyles.flexOne, GlobalStyles.ZuvyDashBoardContainer]}
        >
          <View style={styles.headerClin} />
          <FlatList
            data={languages}
            renderItem={renderItem}
            keyExtractor={item => item.code}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        {/* ✅ Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <Button
            title={const_continue}
            onPress={onHandleOnPress}
            titleStyle={[fS(ms(16)), fontColor(colors.black)]}
            viewStyle={[
              GlobalStyles.Custombutton,
              mt(65),
              bR(10),
              height(60),
              GlobalStyles.authBtn,
            ]}
          />
        </View>
      </KeyboardAvoidingView>
    </BackgroundPrimaryColor>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: mvs(100), // space for button
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: mvs(20),
    left: mvs(5),
    right: mvs(5),
  },
  headerClin: {
    width: 40,
    height: 2,
    borderRadius: 2,
    borderColor: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: ms(15),
  },
});

export default React.memo(ChooseLanguages);
