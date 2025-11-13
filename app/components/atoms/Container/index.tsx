import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import { Colors, Typography } from '../../../styles';
import CardContainer from '../CardContainer';
import { CustomText } from '../Text';
import config from '../../../screens/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../styles/colors';
import {
  ContactSVG,
  BagSVG,
  LocationSVG,
  PhoneSVG,
  Globe,
  Shield,
  Bell,
  ShippmentSVG,
} from '../../../assets/svg';
import { ms } from 'react-native-size-matters';
import { RootState } from '../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fontColor } from '../../../utils/spaces';
import { useNavigation } from '@react-navigation/native';
import { showAlert } from '../AlertBox/showAlert';
import secureStorage from '../../../utils/secureStorage';
import PressableOpacity from '../PressableOpacity';
import { LogoutRequest } from '../../../screens/UserProfile/profileSlice';
import { mvs } from 'react-native-size-matters';
import { capitalizeFirstLetter } from '../../../utils/helper';

const withBottomWhiteOverlay = (WrappedComponent: React.ComponentType<any>) => {
  
  return (props: any) => {

    const { profileData, error,logoutData } = useSelector( (state: RootState) => state.profile);

    const { hideTopContent = false, hideBottomContent = false } = props;
    const { paddingRight, paddingLeft, ...restFont } =
      GlobalStyles.ZuvyDashBoardBtnText;

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const handleLogout = () => {
  Alert.alert(
    'Confirm Logout',
    'Are you sure you want to log out?',
    [
      {
        text: 'No',
        onPress: () => console.log('Logout cancelled'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(LogoutRequest());
        },
      },
    ],
    { cancelable: true }
  );
};
   useEffect(() => {
  if (logoutData) {
    if (logoutData?.success) {
      showAlert(logoutData?.message);
      secureStorage.clearAll();
      navigation.reset({
        index: 0,
        routes: [{ name: 'ChooseLanguage' }],
      });
      dispatch(LogoutRequest()); // 👈 resets logoutData to null
    }
  }
}, [logoutData]);


  

    // --- Data Arrays ---

    // --- Reusable Components ---
    // --- UI ---
    return (
      <View style={styles.container}>
        {!hideTopContent && ( // 👈 conditionally render top section
          <>
            <View style={[GlobalStyles.whiteHalf, GlobalStyles.whiteOverlay]} />
            <View style={GlobalStyles.topContent}>
              <WrappedComponent {...props} />
            </View>
          </>
        )}

        {!hideBottomContent && (
          <View style={GlobalStyles.scrollArea}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={GlobalStyles.scrolIndexStyle}
            >
              {/* Personal Info Card */}
              <CardContainer
                style={GlobalStyles.borderStyles}
                showShadow={false}
              >
                {/* <View style={GlobalStyles.row}>
                  <CustomText
                    title={config.Profile.PersonalInfoTitle}
                    textStyle={[GlobalStyles.cardTiltle]}
                  />
                  <TouchableOpacity
                    style={[GlobalStyles.row, { flex: 0, width: 50 }]}
                  >
                    <FontAwesome5
                      name="pen"
                      size={12}
                      color={colors.faintblueColorRBG}
                    />
                    <CustomText
                      title={config.Profile.edit}
                      textStyle={[
                        GlobalStyles.faintText,
                        { color: Colors.faintblueColorRBG },
                      ]}
                    />
                  </TouchableOpacity>
                </View> */}
                <View
                  style={[
                    GlobalStyles.row,
                    GlobalStyles.containerPaddings,
                    GlobalStyles.avoidJustify,
                  ]}
                >
                  <ContactSVG
                    width={ms(40)}
                    height={ms(40)}
                    fill={Colors.white}
                  />
                  <View style={GlobalStyles.textConatiner}>
                    <CustomText
                      title={config.Profile.fullname}
                      textStyle={[
                        Typography.size.dynamic(
                          12,
                          'medium',
                          colors.fadeTextColor,
                        ),
                      ]}
                    />
                    <CustomText
                      title={profileData?.data?.name}
                      style={[restFont, fontColor(Colors.black)]}
                    />
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyles.row,
                    GlobalStyles.containerPaddings,
                    GlobalStyles.avoidJustify,
                  ]}
                >
                  <BagSVG width={ms(40)} height={ms(40)} fill={Colors.white} />
                  <View style={GlobalStyles.textConatiner}>
                    <CustomText
                      title={config.Profile.role}
                      textStyle={[
                        Typography.size.dynamic(
                          12,
                          'medium',
                          colors.fadeTextColor,
                        ),
                      ]}
                    />
                    <CustomText
                      title={capitalizeFirstLetter(profileData?.data?.roles[0]?.name)}
                      style={[restFont, fontColor(Colors.black)]}
                    />
                  </View>
                </View>

                <View
                  style={[
                    GlobalStyles.row,
                    GlobalStyles.containerPaddings,
                    GlobalStyles.avoidJustify,
                  ]}
                >
                  <LocationSVG
                    width={ms(40)}
                    height={ms(40)}
                    fill={Colors.white}
                  />
                  <View style={GlobalStyles.textConatiner}>
                    <CustomText
                      title={config.Profile.Zone}
                      textStyle={[
                        Typography.size.dynamic(
                          12,
                          'medium',
                          colors.fadeTextColor,
                        ),
                      ]}
                    />
                    <CustomText
              title={(profileData?.data?.state?.name || "NA").toString().toLowerCase()}
                      style={[restFont, fontColor(Colors.black)]}
                    />
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyles.row,
                    GlobalStyles.containerPaddings,
                    GlobalStyles.avoidJustify,
                  ]}
                >
                  <ContactSVG
                    width={ms(40)}
                    height={ms(40)}
                    fill={Colors.white}
                  />
                  <View style={GlobalStyles.textConatiner}>
                    <CustomText
                      title={config.Profile.contact}
                      textStyle={[
                        Typography.size.dynamic(
                          12,
                          'medium',
                          colors.fadeTextColor,
                        ),
                      ]}
                    />
                    <CustomText
                      title={profileData?.data?.mobile}
                      style={[restFont, fontColor(Colors.black)]}
                    />
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyles.row,
                    GlobalStyles.containerPaddings,
                    GlobalStyles.avoidJustify,
                  ]}
                >
                  <LocationSVG
                    width={ms(40)}
                    height={ms(40)}
                    fill={Colors.white}
                  />
                  <View style={GlobalStyles.textConatiner}>
                    <CustomText
                      title={config.Profile.Details}
                      textStyle={[
                        Typography.size.dynamic(
                          12,
                          'medium',
                          colors.fadeTextColor,
                        ),
                      ]}/>
                    <CustomText
                      title={capitalizeFirstLetter('Shipping')}
                      style={[restFont, fontColor(Colors.black)]}
                    />
                  </View>
                </View>
              </CardContainer>

              {/* Settings Card */}
              <CustomText
                title={config.Profile.setting}
                textStyle={[GlobalStyles.cardTiltle, { left: ms(22) }]}
              />

              <CardContainer
                style={[GlobalStyles.borderStyles, { height: ms(70) }]}
                showShadow={false}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ChooseLanguage');
                  }}
                  activeOpacity={0.5}
                  style={[
                    GlobalStyles.row,
                    GlobalStyles.containerPaddings,
                    GlobalStyles.avoidJustify,
                  ]}
                >
                  <Globe width={ms(40)} height={ms(40)} fill={Colors.white} />
                  <View style={GlobalStyles.textConatiner}>
                    <CustomText
                      title={config.Profile.lang}
                      textStyle={[
                        Typography.size.dynamic(
                          10,
                          'medium',
                          colors.fadeTextColor,
                        ),
                      ]}
                    />
                    <CustomText title={'English'} style={[restFont]} />
                  </View>
                </TouchableOpacity>
              </CardContainer>

              <CardContainer
                style={[GlobalStyles.borderStyles, { height: ms(70) }]}
                showShadow={false}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('notifications');
                  }}
                  activeOpacity={0.5}
                  style={[
                    GlobalStyles.row,
                    GlobalStyles.containerPaddings,
                    GlobalStyles.avoidJustify,
                  ]}
                >
                  <Bell width={ms(40)} height={ms(40)} fill={Colors.white} />
                  <View style={GlobalStyles.textConatiner}>
                    <CustomText
                      title={config.Profile.noti}
                      style={[restFont]}
                    />
                  </View>
                </TouchableOpacity>
              </CardContainer>
              <CardContainer
                style={[GlobalStyles.borderStyles, { height: ms(70) }]}
                showShadow={false}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[
                    GlobalStyles.row,
                    GlobalStyles.containerPaddings,
                    GlobalStyles.avoidJustify,
                  ]}
                >
                  <Shield width={ms(40)} height={ms(40)} fill={Colors.white} />
                  <View style={GlobalStyles.textConatiner}>
                    <CustomText
                      title={config.Profile.privaSecurity}
                      textStyle={[
                        Typography.size.dynamic(
                          10,
                          'medium',
                          colors.fadeTextColor,
                        ),
                      ]}
                    />
                    <CustomText title={'Standard'} style={[restFont]} />
                  </View>
                </TouchableOpacity>
              </CardContainer>

              <PressableOpacity onPress={handleLogout}>
                <CardContainer
                  style={[GlobalStyles.logoutBorderStyles]}
                  showShadow={false}
                >
                  <FontAwesome5
                    name="sign-out-alt"
                    size={20}
                    color={Colors.red}
                  />
                  
                  <CustomText
                    title={config.Profile.logout}
                    textStyle={[
                      restFont,
                      GlobalStyles.textConatiner,
                      { color: Colors.red },
                    ]}
                  />
                  </CardContainer>
              </PressableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.primaryColor,
  },
});

export default withBottomWhiteOverlay;
