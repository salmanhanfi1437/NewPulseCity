import React, { useEffect } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  ScrollView,
  View,
} from 'react-native';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles from '../../styles/GlobalStyles';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import CardContainer from '../../components/atoms/CardContainer';
import { Colors } from '../../styles';
import CustomTextInput from '../../components/atoms/TextInput';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import Header from '../../components/atoms/HeaderComponent';
import Badge from '../../components/atoms/Badge';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import Dropdown from '../../components/atoms/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { QrplassholderSVG } from '../../assets/svg';
import CustomButton from '../../components/atoms/CustomButton';
const { width, height } = Dimensions.get('window');

const EditQR = () => {
  const navigation = useNavigation<any>();
  const { color, ...avoidcolor } = GlobalStyles.faintText;
  return (
    <BlueWhiteBackground
      headerHeight={100}
      BlueWhiteBackgroundStyle={GlobalStyles.lightwhite}
    >
      <Header
        title={config.ZuvyQrEdit.H1}
        showBack={true}
        rightIcon={false}
        IconColor={GlobalStyles.blackcolor.color}
        titleStyle={[GlobalStyles.headertitle, GlobalStyles.blackcolor]}
        containerStyle={[
          GlobalStyles.Full_widthLine,
          { paddingBottom: GlobalStyles.margin_top10.marginTop },
        ]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          (GlobalStyles.ZuvyDashBoardScrollContent,
          GlobalStyles.ZuvyDashBoardContainer)
        }
      >
        <View
          style={[
            GlobalStyles.ZuvyDashBoardRowContainer,
            GlobalStyles.containerPaddings,
          ]}
        >
          <View style={[GlobalStyles.viewRow]}>
            <CustomText
              title={config.ZuvyQrEdit.zQR_ID}
              textStyle={GlobalStyles.greyColorText}
            />
            <CustomText title={'ZQR-007214'} />
          </View>
          <Badge
            backgroundColor={colors.greenBadgeColor}
            text={'Purchased'}
            textcolor={Colors.darkGreen}
          />
        </View>
        <CustomText
          title={config.ZuvyQrEdit.qrlabel1}
          textStyle={[
            GlobalStyles.faintText,
            avoidcolor,
            GlobalStyles.greyColorText,
            GlobalStyles.containerPaddings,
          ]}
        />

        <CardContainer>
          <CustomText title={config.ZuvyQrEdit.basicsDetails} />
          <CustomText
            title={config.ZuvyQrEdit.kitname}
            textStyle={[GlobalStyles.greyColorText, GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              GlobalStyles.margin_top10,
              {
                borderColor: GlobalStyles.greyColorText.color,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput placeholder={''} value={'QR For Grocery Kit'} />
          </ViewOutlined>
          <CustomText
            title={config.ZuvyQrEdit.Description}
            textStyle={[GlobalStyles.greyColorText, GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              GlobalStyles.margin_top10,
              {
                borderColor: GlobalStyles.greyColorText.color,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
                height: GlobalStyles.playGradientBox.height,
              },
            ]}
          >
            <CustomTextInput
              placeholder={
                'kmsaComplete security solution for home and get it donesdadadad'
              }
              multiline
              style={{}}
            />
          </ViewOutlined>
          <CustomText
            title={config.ZuvyQrEdit.location}
            textStyle={[GlobalStyles.greyColorText, GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              GlobalStyles.margin_top10,
              {
                borderColor: GlobalStyles.greyColorText.color,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput
              placeholder={''}
              value={'Living Room - Main Entrance'}
            />
          </ViewOutlined>
          <CustomText
            title={config.ZuvyQrEdit.Category}
            textStyle={[GlobalStyles.greyColorText, GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              GlobalStyles.margin_top10,
              {
                borderColor: GlobalStyles.greyColorText.color,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <Dropdown
              data={['test1', 'test2', 'test3']}
              selectedValue={''}
              placeholder={config.ZuvyQrEdit.Security}
              onSelect={() => {}}
            />
          </ViewOutlined>
        </CardContainer>
        <CardContainer>
          <CustomText title={config.ZuvyQrEdit.contactInfo} />
          <CustomText
            title={config.ZuvyQrEdit.emergencyContact}
            textStyle={[GlobalStyles.greyColorText, GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              GlobalStyles.margin_top10,
              {
                borderColor: GlobalStyles.greyColorText.color,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput placeholder={''} value={'+91 9470041619'} />
          </ViewOutlined>

          <CustomText
            title={config.ZuvyQrEdit.Email}
            textStyle={[GlobalStyles.greyColorText, GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              GlobalStyles.margin_top10,
              {
                borderColor: GlobalStyles.greyColorText.color,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput placeholder={''} value={'john.doe@email.com'} />
          </ViewOutlined>
        </CardContainer>
        <CardContainer>
          <View style={[GlobalStyles.zuvyRightIcons]}>
            <CustomText
              title={config.ZuvyQrEdit.readOnlyinfo}
              textStyle={[
                GlobalStyles.greyColorText,
                { paddingRight: GlobalStyles.textConatiner.left },
              ]}
            />
            <MaterialIcons name="lock" size={18} color={colors.grey_50} />
          </View>
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomText
              title={config.ZuvyQrEdit.Owner}
              textStyle={[GlobalStyles.greyColorText]}
            />
            <CustomText
              title={'Test Name'}
              textStyle={[GlobalStyles.greyColorText]}
            />
          </View>
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomText
              title={config.ZuvyQrEdit.Purchase_Date}
              textStyle={[GlobalStyles.greyColorText]}
            />
            <CustomText
              title={'******'}
              textStyle={[GlobalStyles.greyColorText]}
            />
          </View>
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomText
              title={config.ZuvyQrEdit.Payment_Method}
              textStyle={[GlobalStyles.greyColorText]}
            />
            <CustomText
              title={'*****'}
              textStyle={[GlobalStyles.greyColorText]}
            />
          </View>
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomText
              title={config.ZuvyQrEdit.Amount_Paid}
              textStyle={[GlobalStyles.greyColorText]}
            />
            <CustomText
              title={'*****'}
              textStyle={[GlobalStyles.greyColorText]}
            />
          </View>
        </CardContainer>
        <CardContainer>
          <CustomText title={config.ZuvyQrEdit.readOnlyinfo} />
          <QrplassholderSVG
            style={[
              { alignSelf: GlobalStyles.paginationContainer.alignSelf },
              GlobalStyles.margin_top10,
            ]}
          />
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomButton
              gradientColors={colors.whiteGradient}
              title={config.ZuvyQrEdit.downloadQr}
              onPress={() => {}}
              textStyles={[
                GlobalStyles.greyColorText,
                { fontSize: GlobalStyles.playDurationText.fontSize },
              ]}
              buttonStyle={[
                GlobalStyles.shadowStyles,
                GlobalStyles.borderStyles,
                GlobalStyles.halfwidth,
                {
                  borderRadius: GlobalStyles.modalDropdownList.borderRadius,
                },
              ]}
            />
            <CustomButton
              gradientColors={colors.whiteGradient}
              title={config.ZuvyQrEdit.share}
              onPress={() => {}}
              textStyles={[
                GlobalStyles.greyColorText,
                {
                  fontSize: GlobalStyles.playDurationText.fontSize,
                },
              ]}
              buttonStyle={[
                GlobalStyles.shadowStyles,
                GlobalStyles.borderStyles,
                GlobalStyles.halfwidth,
                {
                  borderRadius: GlobalStyles.modalDropdownList.borderRadius,
                },
              ]}
            />
          </View>
        </CardContainer>
        <CustomButton
          textStyles={{ fontSize: GlobalStyles.cardTiltle.fontSize }}
          buttonStyle={[
            GlobalStyles.ZuvyDashBoardContainer,
            { borderRadius: GlobalStyles.modalDropdownList.borderRadius },
          ]}
          title={'Save Changes'}
          onPress={() => {}}
        />

        <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
          <CustomButton
            gradientColors={colors.whiteGradient}
            title={'Cancel'}
            onPress={() => {}}
            textStyles={[
              GlobalStyles.greyColorText,
              { fontSize: GlobalStyles.playDurationText.fontSize },
            ]}
            buttonStyle={[
              GlobalStyles.shadowStyles,
              GlobalStyles.borderStyles,
              GlobalStyles.halfwidth,
              {
                borderRadius: GlobalStyles.modalDropdownList.borderRadius,
              },
            ]}
          />
          <CustomButton
            gradientColors={colors.whiteGradient}
            title={'Delete'}
            onPress={() => {}}
            textStyles={[
              GlobalStyles.greyColorText,
              {
                fontSize: GlobalStyles.playDurationText.fontSize,
              },
            ]}
            buttonStyle={[
              GlobalStyles.shadowStyles,
              GlobalStyles.borderStyles,
              GlobalStyles.halfwidth,
              {
                borderRadius: GlobalStyles.modalDropdownList.borderRadius,
              },
            ]}
          />
        </View>
      </ScrollView>
    </BlueWhiteBackground>
  );
};

export default EditQR;
