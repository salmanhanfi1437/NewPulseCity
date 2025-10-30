import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles from '../../styles/GlobalStyles';
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
  RightArrowSVG,
  RightSVG,
  ShieldSVG,
  VectorSVG,
  WechatSVG,
} from '../../assets/svg';
import CustomButton from '../../components/atoms/CustomButton';
import VideoCard from '../../components/atoms/VideoCard';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';

const ZuvyDashBoard = () => {
  const navigation = useNavigation<any>();
  const { borderRadius, ...shadowWithoutRadius } = GlobalStyles.shadowStyles;
  return (
    <BlueWhiteBackground headerHeight={90}>
      <ZuvyHeader onProfilePress={() => navigation.navigate('Profile')} />
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
        <CardContainer style={GlobalStyles.ZuvyDashBoardCard}>
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
                GlobalStyles.greyColorText,
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
            style={[GlobalStyles.zuvyRightIcons, { alignItems: 'flex-start' }]}
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
              { alignItems: 'flex-start' },
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
          <CardContainer>
            <GreenbagSVG />
            <CustomText
              title={config.ZuvyDashBoard.verifyOwner}
              textStyle={[
                GlobalStyles.headingText,
                GlobalStyles.containerPaddings,
                { marginTop: 8, fontSize: ms(14) },
              ]}
            />
            <CustomText
              title={config.ZuvyDashBoard.legalkit}
              textStyle={GlobalStyles.greyColorText}
            />
            <CustomText
              title={config.ZuvyDashBoard.registerName}
              textStyle={GlobalStyles.greyColorText}
            />
          </CardContainer>

          <CustomButton
            gradientColors={colors.profileHeaderGradient}
            title={'Refer & Earn'}
            onPress={() => {}}
            buttonStyle={[
              GlobalStyles.ZuvyDashBoardBtn,
              GlobalStyles.ZuvyDashBoardContainer,
            ]}
            textStyles={GlobalStyles.ZuvyDashBoardBtnText}
            commingSoon
            BadgeText={config.ZuvyDashBoard.commingSoon}
            leftIcon={<VectorSVG fill="#fff" />}
          />
          <CustomButton
            gradientColors={['#FFF', '#FFF', '#FFFFFF']}
            title={config.ZuvyDashBoard.customerSuport}
            onPress={() => {}}
            buttonStyle={[
              GlobalStyles.ZuvyDashBoardBtn,
              GlobalStyles.ZuvyDashBoardContainer,
              shadowWithoutRadius,
            ]}
            textStyles={[
              GlobalStyles.ZuvyDashBoardBtnText,
              { color: Colors.black },
            ]}
            leftIcon={<WechatSVG />}
            rightIcon={<RightArrowSVG fill={Colors.white} />}
          />
          <CustomButton
            gradientColors={['#FFF', '#FFF', '#FFF']}
            title={config.ZuvyDashBoard.legalZuvy}
            onPress={() => {}}
            buttonStyle={[
              GlobalStyles.ZuvyDashBoardBtn,
              GlobalStyles.ZuvyDashBoardContainer,
              shadowWithoutRadius,
            ]}
            textStyles={[
              GlobalStyles.ZuvyDashBoardBtnText,
              { color: Colors.black },
            ]}
            rightIcon={<RightArrowSVG fill={Colors.white} />}
            leftIcon={<InfoSVG />}
          />
        </View>
      </ScrollView>
    </BlueWhiteBackground>
  );
};

export default ZuvyDashBoard;
