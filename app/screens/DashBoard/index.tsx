import React, { useEffect } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
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
import { Colors } from '../../styles';
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

const ZuvyDashBoard = () => {
  const navigation = useNavigation<any>();
  const { backgroundColor, ...restZuvyDashBoardBtn } =
    GlobalStyles.ZuvyDashBoardBtn;

  const DistributorsArr = [
    {
      title: 'Verified QR Ownership',
      description: 'Every kit you buy is legally \n registered to your name.',
      icon: GreenbagSVG,
    },
    {
      title: 'Guaranteed Activation Timeline',
      description:
        'Your investment is protected \n with a clear refund window.',
      icon: LockSvg,
    },
    {
      title: 'Transparent Delivery Tracking',
      description: 'Track your kit delivery \n from dispatch to doorstep.',
      icon: TransportSvg,
    },
  ];

  return (
    <BlueWhiteBackground headerHeight={80}>
      <ZuvyHeader
        onProfilePress={() => navigation.navigate('Profile')}
        onNotificationPress={() => navigation.navigate('notifications')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.ZuvyDashBoardScrollContent}
      >
        <View style={GlobalStyles.translusantContainer}>
          <CustomText
            title={config.ZuvyDashBoard.welcomeTitle}
            textStyle={[GlobalStyles.mobileText]}
          />
          <CustomText
            title={config.ZuvyDashBoard.overview}
            textStyle={[GlobalStyles.imageText, { marginVertical: 10 }]}
          />
          <View style={[GlobalStyles.zuvyRightIcons, { marginVertical: 5 }]}>
            <CustomText
              title={config.ZuvyDashBoard.city}
              textStyle={[GlobalStyles.imageText, { fontSize: ms(12) }]}
            />
            <VerticalLine />
            <CustomText
              title={config.ZuvyDashBoard.distriduteID}
              textStyle={[GlobalStyles.imageText, { fontSize: ms(12) }]}
            />
          </View>
        </View>
        <CardContainer
          style={[GlobalStyles.ZuvyDashBoardCard, GlobalStyles.width50]}
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
              textStyle={{ color: Colors.grey }}
            />
            <CustomText
              title={'15 kits'}
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
              textStyle={{ color: Colors.grey }}
            />
            <CustomText
              title={'0'}
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
            <CalendarSVG width={ms(30)} height={ms(30)} />
            <View style={GlobalStyles.textConatiner}>
              <CustomText
                title={config.ZuvyDashBoard.date}
                textStyle={GlobalStyles.greyColorText}
              />
              <CustomText title={config.ZuvyDashBoard.activationDate} />
              <CustomText title={'15/12/2024'} />
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
                textStyle={GlobalStyles.greyColorText}
              />
              <CustomText title={config.ZuvyDashBoard.refunddate} />
            </View>
          </View>
          <CustomButton
            title={config.ZuvyDashBoard.viewKit}
            buttonStyle={GlobalStyles.ZuvyDashBoardBtn}
            textStyles={GlobalStyles.ZuvyDashBoardBtnText}
            onPress={() => {}}
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
          <TouchableOpacity>
            <CustomText
              title={config.ZuvyDashBoard.viewAll}
              textStyle={[
                {
                  fontSize: GlobalStyles.ZuvyDashBoardBtnText.fontSize,
                  color: Colors.primaryColor2,
                },
              ]}
            />
          </TouchableOpacity>
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
            style={[GlobalStyles.itemCenterStyle, GlobalStyles.lightwhite]}
          >
            <TouchableOpacity>
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
                    { margin: GlobalStyles.iconButton.padding },
                  ]}
                >
                  {<item.icon />}
                  <CustomText
                    title={item.title}
                    textStyle={[
                      GlobalStyles.headingText,
                      { fontSize: GlobalStyles.faintText.fontSize },
                    ]}
                  />
                  <CustomText
                    title={item.description}
                    textStyle={[
                      GlobalStyles.greyColorText,
                      GlobalStyles.faintText,
                    ]}
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
            onPress={() => {}}
            buttonStyle={[
              restZuvyDashBoardBtn,
              GlobalStyles.ZuvyDashBoardContainer,
              GlobalStyles.borderStyles,
              getShadowWithElevation(1),
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
          <CustomButton
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
          />
        </View>
      </ScrollView>
      <HoverButton onPress={() => navigation.navigate('EditQRDetails')} />
    </BlueWhiteBackground>
  );
};

export default ZuvyDashBoard;
