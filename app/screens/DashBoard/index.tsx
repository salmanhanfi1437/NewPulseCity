import React, { useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Linking,
} from 'react-native';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../styles/GlobalStyles';
import ZuvyHeader from '../../components/atoms/DashboardHeaderComponent';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import VerticalLine from '../../components/atoms/VerticalineComponent';
import { ms } from 'react-native-size-matters';
import CardContainer from '../../components/atoms/CardContainer';
import { Colors, Typography } from '../../styles';
import HorizontalLine from '../../components/atoms/HorizontalLine';
import {
  CalendarSVG,
  GreenbagSVG,
  HumburgerSVG,
  InfoSVG,
  LockSvg,
  RightSVG,
  ShieldSVG,
  TransportSvg,
  VectorSVG,
  WechatSVG,
} from '../../assets/svg';
import CustomButton from '../../components/atoms/CustomButton';
import VideoCard from '../../components/atoms/VideoCard';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import HoverButton from '../../components/atoms/HoverButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { DashboardRequest, SetInitialTab } from './dashboardSlice';
import { bgColor, fontColor, fS } from '../../utils/spaces';
import { getNextMonthDate, getNextNDaysDate } from '../../utils/dateUtils';
import { const_welcomeZuvy, yourCart } from '../../types/constants';
import { useTranslation } from 'react-i18next';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';

const ZuvyDashBoard = () => {
  const navigation = useNavigation<any>();

  const { error, dashboardData } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const dispatch = useDispatch();

  const { backgroundColor, ...restZuvyDashBoardBtn } =
    GlobalStyles.ZuvyDashBoardBtn;

  const DistributorsArr = [
    {
      title: 'Verified QR Ownership',
      description: 'Every kit you buy is legally \nregistered to your name.',
      icon: GreenbagSVG,
    },
    {
      title: 'Guaranteed Activation Timeline',
      description: 'Your investment is protected \nwith a clear refund window.',
      icon: LockSvg,
    },
    {
      title: 'Transparent Delivery Tracking',
      description: 'Track your kit delivery \nfrom dispatch to doorstep.',
      icon: TransportSvg,
    },
  ];

  const { t } = useTranslation();

  useEffect(() => {
    if (dashboardData || error) {
      console.log('DashBoardData ' + JSON.stringify(dashboardData));
    }
  }, [dashboardData, error]);

  useEffect(() => {
    dispatch(DashboardRequest());
  }, []);

  const handletestimonial = () => {
    Linking.openURL('https://www.youtube.com/@Zuvyofficial');
  };

  const handleContactSupport = () => {
    Linking.openURL('https://zuvy.store/contact/');
  };

  const moveToNotificationScreen = () =>{
    navigation.navigate('merchantTabs', {
  screen: 'Notification',
});
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          GlobalStyles.ZuvyDashBoardScrollContent,
          { backgroundColor: GlobalStyles.whiteColor.color, width: '100%' },
        ]}
      >
        <BlueWhiteBackground headerHeight={80}>
          <ZuvyHeader
            onProfilePress={() => navigation.navigate('Profile')}
            onNotificationPress={() => navigation.navigate('notifications')}
            title={dashboardData?.data?.distributorName[0]}
          />
          <View style={GlobalStyles.translusantContainer}>
            <CustomText
              title={`${t(const_welcomeZuvy)} ${
                dashboardData?.data?.distributorName
              }`}
              textStyle={[GlobalStyles.mobileText]}
            />
            <CustomText
              title={config.ZuvyDashBoard.overview}
              textStyle={[GlobalStyles.imageText, { marginVertical: 10 }]}
            />
            <View style={[GlobalStyles.zuvyRightIcons, { marginVertical: 5 }]}>
              <CustomText
                title={`City : ${dashboardData?.data?.distributorCity}`}
                textStyle={[GlobalStyles.imageText, { fontSize: ms(12) }]}
              />
              <VerticalLine />
              <CustomText
                title={`Mobile Number: ${dashboardData?.data?.distributorMobile}`}
                textStyle={[GlobalStyles.imageText, { fontSize: ms(12) }]}
              />
            </View>
          </View>
          <CardContainer
            style={[
              GlobalStyles.ZuvyDashBoardCard,
              GlobalStyles.width50,
              getShadowWithElevation(1),
            ]}
          >
            <CustomText
              title={config.ZuvyDashBoard.QRsummary}
              textStyle={[
                GlobalStyles.headingText,
                GlobalStyles.avoidTopMargin,
                { fontSize: ms(14) },
              ]}
            />
            <View style={[GlobalStyles.row, GlobalStyles.containerPaddings]}>
              <CustomText
                title={config.ZuvyDashBoard.QRpurchased}
                textStyle={[
                  Typography.size.dynamic(13),
                  { color: Colors.textColorGrey },
                ]}
              />
              <CustomText
                title={`${dashboardData?.data?.totalQuantity} kits`}
                textStyle={[
                  GlobalStyles.headingText,
                  GlobalStyles.avoidTopMargin,
                  { color: colors.primaryColor1 },
                ]}
              />
            </View>
            <View style={[GlobalStyles.row]}>
              <CustomText
                title={config.ZuvyDashBoard.activekit}
                textStyle={[
                  Typography.size.dynamic(13),
                  { color: Colors.textColorGrey },
                ]}
              />
              <CustomText
                title={`${dashboardData?.data?.usedQuantity} kits`}
                textStyle={[
                  GlobalStyles.headingText,
                  GlobalStyles.avoidTopMargin,
                  GlobalStyles.greyColorText,
                ]}
              />
            </View>
            <HorizontalLine />
            <View
              style={[
                GlobalStyles.zuvyRightIcons,
                { alignItems: GlobalStyles.avoidJustify.justifyContent },
              ]}
            >
              <CalendarSVG width={ms(20)} height={ms(30)} />
              <View style={GlobalStyles.textConatiner}>
                <CustomText
                  title={config.ZuvyDashBoard.date}
                  textStyle={[
                    Typography.size.dynamic(12),
                    GlobalStyles.fadeText,
                  ]}
                />
                <CustomText
                  title={config.ZuvyDashBoard.activationDate}
                  textStyle={[Typography.size.dynamic(13)]}
                />
                <Text style={[Typography.size.dynamic(13)]}>
                  {getNextMonthDate()}
                </Text>
              </View>
            </View>
            <View
              style={[
                GlobalStyles.zuvyRightIcons,
                GlobalStyles.containerPaddings,
                { alignItems: GlobalStyles.avoidJustify.justifyContent },
              ]}
            >
              <ShieldSVG width={ms(25)} height={ms(25)} />
              <View style={GlobalStyles.textConatiner}>
                <CustomText
                  title={config.ZuvyDashBoard.refund}
                  textStyle={[
                    Typography.size.dynamic(12),
                    GlobalStyles.fadeText,
                  ]}
                />
                <Text style={[Typography.size.dynamic(13)]}>
                  {getNextNDaysDate(20)}
                </Text>
              </View>
            </View>

            <CustomButton
              title={config.ZuvyDashBoard.viewKit}
              buttonStyle={[
                GlobalStyles.ZuvyDashBoardBtn,

                { width: GlobalStyles.width70.width * 1.2 },
              ]}
              textStyles={GlobalStyles.ZuvyDashBoardBtnText}
              onPress={() => {
                if (dashboardData?.data?.totalQuantity > 0) {
                  dispatch(SetInitialTab('QRCode'));
                  navigation.replace('merchantTabs');

                  //navigation.getParent()?.navigate('QRManagement');
                } else {
                  navigation.navigate(yourCart);
                }
              }}
              leftIcon={<HumburgerSVG />}
              rightIcon={<RightSVG />}
            />
          </CardContainer>
          <View
            style={[
              GlobalStyles.ZuvyDashBoardRowContainer,
              GlobalStyles.containerPaddings,
            ]}
          >
            <CustomText
              title={config.ZuvyDashBoard.Distributor_Exp}
              textStyle={[
                { fontSize: GlobalStyles.ZuvyDashBoardBtnText.fontSize },
              ]}
            />
          </View>
          <View
            style={[
              GlobalStyles.ZuvyDashBoardContainer,
              GlobalStyles.containerPaddings,
            ]}
          >
            <CustomText
              title={config.ZuvyDashBoard.testimonialLabel}
              textStyle={[
                GlobalStyles.greyColorText,
                { fontSize: GlobalStyles.playRole.fontSize },
              ]}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              style={[GlobalStyles.containerPaddings, GlobalStyles.iconButton]}
            >
              <VideoCard name={'Rajesh Kumar'} role={'Delhi Distributor'} />
            </ScrollView>
            <CardContainer
              style={[
                GlobalStyles.itemCenterStyle,
                GlobalStyles.lightwhite,
                getShadowWithElevation(1),
                bgColor(colors.watchTestimonial),
              ]}
            >
              <TouchableOpacity onPress={handletestimonial}>
                <CustomText title={config.ZuvyDashBoard.moreTestimonial} />
              </TouchableOpacity>
            </CardContainer>

            <CustomText
              title={config.ZuvyDashBoard.trustZuvylable}
              textStyle={[
                GlobalStyles.containerPaddings,
                GlobalStyles.buttonText,
                {
                  color: Colors.black,
                  fontSize: GlobalStyles.imageText.fontSize,
                },
              ]}
            />

            <FlatList
              data={DistributorsArr}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <CardContainer
                    style={[
                      GlobalStyles.width70,
                      getShadowWithElevation(1),
                      { margin: GlobalStyles.iconButton.padding },
                    ]}
                  >
                    {<item.icon />}
                    <CustomText
                      title={item.title}
                      textStyle={[GlobalStyles.headingText, fS(12)]}
                    />
                    <CustomText
                      title={item.description}
                      textStyle={[GlobalStyles.faintText]}
                    />
                  </CardContainer>
                );
              }}
            />

            <CustomButton
              gradientColors={colors.profileHeaderGradient}
              title={'Refer & Earn'}
              onPress={() => {}}
              buttonStyle={[
                restZuvyDashBoardBtn,
                GlobalStyles.ZuvyDashBoardContainer,
                getShadowWithElevation(1),
                GlobalStyles.width40,
              ]}
              textStyles={GlobalStyles.ZuvyDashBoardBtnText}
              commingSoon
              badgeTextColor={colors.white}
              BadgeText={config.ZuvyDashBoard.commingSoon}
              leftIcon={<VectorSVG fill={Colors.white} />}
            />
            <CustomButton
              gradientColors={[Colors.white, Colors.white, Colors.white]}
              title={config.ZuvyDashBoard.customerSuport}
              onPress={handleContactSupport}
              buttonStyle={[
                restZuvyDashBoardBtn,
                GlobalStyles.ZuvyDashBoardContainer,
                GlobalStyles.borderStyles,
                getShadowWithElevation(1),
                GlobalStyles.width40,
              ]}
              textStyles={[
                GlobalStyles.ZuvyDashBoardBtnText,
                { color: Colors.black },
              ]}
              leftIcon={<WechatSVG />}
              rightIcon={
                <MaterialIcons
                  name="arrow-forward"
                  size={25}
                  color={colors.grey_50}
                />
              }
            />
            {/* <CustomButton
            gradientColors={[Colors.white, Colors.white, Colors.white]}
            title={config.ZuvyDashBoard.legalZuvy}
            onPress={() => {}}
            buttonStyle={[
              GlobalStyles.ZuvyDashBoardContainer,
              restZuvyDashBoardBtn,
              GlobalStyles.borderStyles,
              getShadowWithElevation(1),
            ]}
            textStyles={[
              GlobalStyles.ZuvyDashBoardBtnText,
              { color: Colors.black },
            ]}
            rightIcon={
              <MaterialIcons
                name="arrow-forward"
                size={25}
                color={colors.grey_50}
              />
            }
            leftIcon={<InfoSVG />}
          /> */}
          </View>
          <View style={styles.hoverButtonContainer}></View>
        </BlueWhiteBackground>
      </ScrollView>
      <HoverButton onPress={() => navigation.navigate(yourCart)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hoverButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10, // optional: safe spacing
    backgroundColor: 'transparent', // ensures scroll content shows behind
  },
});
export default ZuvyDashBoard;
