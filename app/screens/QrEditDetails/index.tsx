import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  GestureResponderEvent,
  ScrollView,
  Share,
  ToastAndroid,
  View,
} from 'react-native';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../styles/GlobalStyles';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import CardContainer from '../../components/atoms/CardContainer';
import { Colors, Typography } from '../../styles';
import CustomTextInput from '../../components/atoms/TextInput';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import Header from '../../components/atoms/HeaderComponent';
import Badge from '../../components/atoms/Badge';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import Dropdown from '../../components/atoms/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  DownloadSVG,
  QrplassholderSVG,
  QrPreviewSVG,
  RedTrashSVG,
  SaveSvg,
} from '../../assets/svg';
import CustomButton from '../../components/atoms/CustomButton';
import {
  borderWidth,
  fontColor,
  fontW,
  paddingH,
  pb,
  pt,
} from '../../utils/spaces';
import { EditQRDetails } from '../../navigation/types';
import { useDispatch } from 'react-redux';
import { editQrRequest, resetEditQr } from './EditQrSlice';
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';
import EventBus from 'react-native-event-bus';
import { ms } from 'react-native-size-matters';

const EditQR = ({ navigation, route }: EditQRDetails) => {
  const { color, ...avoidcolor } = GlobalStyles.faintText;
  const { data } = route.params;
  console.log('Data ' + JSON.stringify(data));
  const dispatch = useDispatch();

  const [kitName, setKitName] = useState(data?.qrName);
  const [description, setDescription] = useState(data?.description);
  const [location, setLocation] = useState(data?.location);
  const [category, setCategory] = useState(data?.category);
  const [contact, setContact] = useState(data?.creator?.mobile);
  const [email, setEmail] = React.useState(data?.email);

  const handleKitNameChange = (text: string) => setKitName(text);
  const handleDescriptionChange = (text: string) => setDescription(text);
  const handleLocationChange = (text: string) => setLocation(text);
  const handleCategoryChange = (value: string) => setCategory(value);
  const handleContactChange = (text: string) => setContact(text);
  const handleEmailChange = (text: string) => setEmail(text);

  const { editQrData, error } = useSelector((state: RootState) => state.editQr);

  useEffect(() => {
    if (editQrData || error) {
      console.log('EDITQR===> ' + JSON.stringify(editQrData));

      if (editQrData?.success === true) {
        EventBus.getInstance().fireEvent('refreshQR', {
          message: editQrData.message, // optional payload
        });
        navigation.goBack();
        //      showAlert(
        //   editQrData?.message,
        //   'Success',
        //   () => {
        //     navigation.goBack()
        //   }
        // );
      } else {
        showAlert(error?.message);
      }
    }
  }, [editQrData, error]);

  const updateQr = () => {
    dispatch(
      editQrRequest({
        id: data?.id,
        qrName: kitName,
        description,
        location: location,
        category,
        emergencyContactNumber: contact,
        email,
      }),
    );
  };

  useEffect(() => {}, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const dropdownData = config.shopCategories.flatMap(item => [
    { label: item.category, value: null, isCategory: true },
    ...item.subcategories.map(sub => ({
      label: sub,
      value: sub,
      isCategory: false,
    })),
  ]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Share',
        message: 'Hey! Check this out: https://zuvy.store/',
        url: data?.qrImage,
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    Alert.alert('QR Status', 'This QR is not retired yet.');
  };

  const handleQr = ()=>{
    ToastAndroid.show('QR download coming soon', ToastAndroid.SHORT);

  }

  return (
    <BlueWhiteBackground
      headerHeight={100}
      BlueWhiteBackgroundStyle={{ backgroundColor: colors.white }}
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
              textStyle={{ color: colors.color_4B5563 }}
            />
            <CustomText
              title={data.qrCode}
              textStyle={[Typography.weights.boldU()]}
            />
          </View>
          <Badge
            backgroundColor={colors.greenBadgeColor}
            text={'Purchased'}
            textcolor={Colors.darkGreen}
            textStyle={[Typography.size.dynamic(8, 'medium')]}
            padding={8}
          />
        </View>
        <CustomText
          title={config.ZuvyQrEdit.qrlabel1}
          textStyle={[
            Typography.size.dynamic(
              11,
              'regular',
              GlobalStyles.greyColorText.color,
            ),
            pb(5),
          ]}
        />

        <CardContainer style={[getShadowWithElevation(1)]}>
          <CustomText title={config.ZuvyQrEdit.basicsDetails} />
          <CustomText
            title={config.ZuvyQrEdit.kitname}
            textStyle={[
              GlobalStyles.fadeText,
              GlobalStyles.margin_top10,
              Typography.size.dynamic(12),
            ]}
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
              value={kitName}
              onChangeText={handleKitNameChange}
            />
          </ViewOutlined>
          <CustomText
            title={config.ZuvyQrEdit.Description}
            textStyle={[
              GlobalStyles.fadeText,
              GlobalStyles.margin_top10,
              Typography.size.dynamic(12),
            ]}
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
              placeholder={''}
              value={description}
              onChangeText={handleDescriptionChange}
              multiline
            />
          </ViewOutlined>
          <CustomText
            title={config.ZuvyQrEdit.location}
            textStyle={[
              GlobalStyles.fadeText,
              GlobalStyles.margin_top10,
              Typography.size.dynamic(12),
            ]}
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
              value={location}
              onChangeText={handleLocationChange}
            />
          </ViewOutlined>
          <CustomText
            title={config.ZuvyQrEdit.Category}
            textStyle={[
              GlobalStyles.fadeText,
              GlobalStyles.margin_top10,
              Typography.size.dynamic(12),
            ]}
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
              data={dropdownData}
              selectedValue={category}
              onSelect={value => {
                handleCategoryChange(value);
              }}
            />
          </ViewOutlined>
        </CardContainer>
        <CardContainer style={[getShadowWithElevation(1)]}>
          <CustomText
            title={config.ZuvyQrEdit.contactInfo}
            textStyle={[fontW('500')]}
          />
          <CustomText
            title={config.ZuvyQrEdit.emergencyContact}
            textStyle={[
              GlobalStyles.fadeText,
              GlobalStyles.margin_top10,
              Typography.size.dynamic(12),
            ]}
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
              value={contact}
              onChangeText={handleContactChange}
            />
          </ViewOutlined>

          <CustomText
            title={config.ZuvyQrEdit.Email}
            textStyle={[
              GlobalStyles.fadeText,
              GlobalStyles.margin_top10,
              Typography.size.dynamic(12),
            ]}
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
              value={email}
              onChangeText={handleEmailChange}
            />
          </ViewOutlined>
        </CardContainer>
        <CardContainer style={[getShadowWithElevation(1)]}>
          <View style={[GlobalStyles.zuvyRightIcons]}>
            <CustomText
              title={config.ZuvyQrEdit.readOnlyinfo}
              textStyle={[
                GlobalStyles.fadeText,
                { paddingRight: GlobalStyles.textConatiner.left },
              ]}
            />
            <MaterialIcons name="lock" size={18} color={colors.color_6B7280} />
          </View>
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomText
              title={config.ZuvyQrEdit.Owner}
              textStyle={[GlobalStyles.fadeText, Typography.size.dynamic(12)]}
            />
            <CustomText
              title={data.creator.name}
              textStyle={[
                GlobalStyles.fadeText,
                Typography.size.dynamic(12, 'medium'),
              ]}
            />
          </View>
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomText
              title={config.ZuvyQrEdit.Purchase_Date}
              textStyle={[GlobalStyles.fadeText, Typography.size.dynamic(12)]}
            />
            <CustomText
              title={formatDate(data.createdAt)}
              textStyle={[
                GlobalStyles.fadeText,
                Typography.size.dynamic(12, 'medium'),
              ]}
            />
          </View>
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomText
              title={config.ZuvyQrEdit.Payment_Method}
              textStyle={[GlobalStyles.fadeText, Typography.size.dynamic(12)]}
            />
            <CustomText
              title={''}
              textStyle={[
                GlobalStyles.fadeText,
                Typography.size.dynamic(12, 'medium'),
              ]}
            />
          </View>
          <View style={[GlobalStyles.row, GlobalStyles.margin_top10]}>
            <CustomText
              title={config.ZuvyQrEdit.Amount_Paid}
              textStyle={[GlobalStyles.fadeText, Typography.size.dynamic(12)]}
            />
            <CustomText
              title={data?.priceWithGst}
              textStyle={[
                GlobalStyles.fadeText,
                Typography.size.dynamic(12, 'medium'),
              ]}
            />
          </View>
        </CardContainer>
        <CardContainer
          style={[
            getShadowWithElevation(1),
            { borderWidth: 0.5, borderColor: colors.grey_50 },
          ]}
        >
          <CustomText
            title={config.ZuvyQrEdit.qrPreview}
            textStyle={[Typography.weights.mediumU(), fontW('700')]}
          />
          <QrPreviewSVG
            style={[
              { alignSelf: GlobalStyles.paginationContainer.alignSelf },
              GlobalStyles.margin_top10,
            ]}
          />
          <View
            style={[
              GlobalStyles.row,
              GlobalStyles.margin_top10,
              GlobalStyles.width40,
              GlobalStyles.width50,
              paddingH(5),
            ]}
          >
            <CustomButton
              isTransparent={true}
              leftIcon={<DownloadSVG style={{ bottom: 2, right: 5 }} />}
              gradientColors={colors.whiteGradient}
              title={config.ZuvyQrEdit.downloadQr}
              onPress={handleQr}
              textStyles={[GlobalStyles.fadeText, Typography.size.dynamic(10)]}
              buttonStyle={[
                GlobalStyles.borderStyles,
                GlobalStyles.halfwidth,
                {
                  backgroundColor: colors.badgeBg,
                  borderRadius: GlobalStyles.modalDropdownList.borderRadius,
                },
                getShadowWithElevation(0),
              ]}
            />
            <CustomButton
              isTransparent={true}
              gradientColors={colors.whiteGradient}
              title={config.ZuvyQrEdit.share}
              onPress={onShare}
              textStyles={[GlobalStyles.fadeText, Typography.size.dynamic(10)]}
              buttonStyle={[
                GlobalStyles.borderStyles,
                GlobalStyles.halfwidth,
                {
                  backgroundColor: colors.badgeBg,
                  borderRadius: GlobalStyles.modalDropdownList.borderRadius,
                },
                getShadowWithElevation(0),
              ]}
            />
          </View>
        </CardContainer>
        <CustomButton
          leftIcon={
            <SaveSvg width={20} height={20} style={{ right: 8, bottom: 1 }} />
          }
          textStyles={{ fontSize: GlobalStyles.cardTiltle.fontSize }}
          buttonStyle={[
            GlobalStyles.ZuvyDashBoardContainer,
            GlobalStyles.alignItem,
            GlobalStyles.width40,
            { borderRadius: GlobalStyles.modalDropdownList.borderRadius },
          ]}
          title={'Save Changes'}
          onPress={() => updateQr()}
        />

        <View style={[GlobalStyles.row]}>
          <CustomButton
            gradientColors={colors.whiteGradient}
            title={'Cancel'}
            onPress={() => {
              navigation.goBack();
            }}
            textStyles={[GlobalStyles.fadeText, Typography.size.dynamic(11)]}
            buttonStyle={[
              getShadowWithElevation(0),
              GlobalStyles.borderStyles,
              GlobalStyles.halfwidth,
              {
                borderRadius: GlobalStyles.modalDropdownList.borderRadius,
              },
            ]}
          />
          <CustomButton
            leftIcon={<RedTrashSVG style={{ right: 5, bottom: 2 }} />}
            isTransparent={true}
            gradientColors={colors.whiteGradient}
            title={'Delete'}
            onPress={handleDelete}
            textStyles={[fontColor(colors.red), Typography.size.dynamic(11)]}
            buttonStyle={[
              getShadowWithElevation(0),
              GlobalStyles.borderStyles,
              GlobalStyles.halfwidth,

              {
                backgroundColor: colors.faintRed,
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
