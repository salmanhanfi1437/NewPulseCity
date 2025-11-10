import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  const_address,
  const_city,
  const_fullName,
  const_pancard_number,
  const_pincode,
  const_RESET_STORE,
  const_state,
  const_totalAmount,
  enter,
  instantCode,
  itemTotal,
  minus,
  notifications,
  oneyearvalidity,
  plus,
  pricebreakdown,
  proceed,
  quantity,
  securePayment,
  validPanCardNumber,
} from '../../types/constants';
import { CheckOutDetailProps } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../styles/GlobalStyles';
import {
  fontColor,
  mb,
  mt,
  textColor,
  fS,
  paddingH,
  fontW,
  pl,
  mr,
} from '../../utils/spaces';
import { Colors } from '../../styles';
import { CartSVG } from '../../assets/svg';
import { CustomText } from '../../components/atoms/Text';
import FontStyles from '../../styles/FontStyles';
import PressableOpacity from '../../components/atoms/PressableOpacity';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import CustomButton from '../../components/atoms/CustomButton';
import HeaderComponent from '../../components/atoms/HeaderComponent';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import CardContainer from '../../components/atoms/CardContainer';
import CustomTextInput from '../../components/atoms/TextInput';
import config from '../config';
import CartStyles from '../YourCartScreen/styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';
import { checkOutRequest, ResetRazorPay, VerifyRazorPayRequest } from './checkoutSlice';
import { isValidPAN } from '../../utils/helper';
import RazorpayCheckout from 'react-native-razorpay';
import { ProfileRequest } from '../UserProfile/profileSlice';
import { MasterQrRequest } from '../YourCartScreen/yourCartSlice';

const CheckOutDetail = ({ navigation, route }: CheckOutDetailProps) => {
  const { t } = useTranslation();
  console.log('Route ' + JSON.stringify(route));
  const { data } =  route.params;
  console.log('cehkec ---- params ---.',data)

  const [fullName, setFullName] = useState('');
  const [PanCard, setPanCard] = useState('');
  const [GSTNumber, setGSTNumber] = useState('');
  const [companyName, setLegalCompany] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const { checkOutData, error } = useSelector(
    (state: RootState) => state.orderQr,
  );
  const { verifyRazaorPay_data, verifyRazaorPay_error } = useSelector(
    (state: RootState) => state.verifyRazorPayment,
  );
    const { profileData, error: profileError } = useSelector(
      (state: RootState) => state.profile,
    );
      const { error:masterQrError, mastertQrData } = useSelector(
        (state: RootState) => state.masterQr,
      );

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(MasterQrRequest());
    }, []);

      useEffect(() => {
        if (mastertQrData || masterQrError) {
          if (mastertQrData) {
          } else {
            console.log('MasterQrError ' + masterQrError);
          }
        }
      }, [mastertQrData, masterQrError]);
    

  useEffect(() => {
    if (checkOutData || error) {
      if (checkOutData?.success) {
        showAlert(checkOutData?.message);
        handleRazorPayment();
      } else {
        handleRazorPayment();

        // showAlert(error?.message);
      }
    }
  }, [checkOutData, error]);

  const handleBackPress = () => {
    navigation.goBack();
  };
    useEffect(() => {
      if (profileData) {
        if (profileData?.success) {
        }
      } else {
        showAlert(profileError?.message);
      }
    }, [profileData, profileError]);
  

    useEffect(() => {
      dispatch(ProfileRequest());
    }, []);

  useEffect(() => {
    if (verifyRazaorPay_data || verifyRazaorPay_error) {
      if (verifyRazaorPay_data?.success) {
         
         dispatch(ResetRazorPay())
        navigation.replace('merchantTabs');
      }
    } else {
      showAlert(verifyRazaorPay_error?.message);
    }
  }, [verifyRazaorPay_data,verifyRazaorPay_error]);

  const HandlePayment = () => {
    if (fullName == '') {
      showAlert(`${t(const_fullName)} ${t(enter)} `);
    } else if (!isValidPAN(PanCard)) {
      showAlert(t(validPanCardNumber));
    } else if (address == '') {
      showAlert(`${t(const_address)} ${t(enter)} `);
    } else if (stateId == '') {
      showAlert(`Select State`);
    } else if (city == '') {
      showAlert(`Select City`);
    } else if (pinCode == '') {
      showAlert(`Enter Pin code`);
    } else {
      dispatch(
        checkOutRequest({
          fullName,
          pancard: PanCard.toUpperCase(),
          gstNumber: GSTNumber,
          legalCompanyName: companyName,
          state: state,
          city: city,
          pincode: pinCode,
          address,
        }),
      );
    }
  };

  const handleRazorPayment = () => {
    var options: any = {
      description: mastertQrData?.data?.description || 'Payment for QR Package',
      image: config.zuvyBlueLogoforRazarPay,
      currency: data.currency,
      key: config.RazarPayTestKey,
      amount:parseInt(data.amount) * 100,
      order_id: data.razorpayOrderId, 
      prefill: {
        email: profileData?.data?.email,
        contact: profileData?.data?.mobile,
        name: profileData?.data?.name,
      },
      theme: { color: colors.white },
    };
    RazorpayCheckout.open(options)
      .then(data => {
         //dispatch({ type: const_RESET_STORE });
        
        dispatch(
          VerifyRazorPayRequest({
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_order_id: data.razorpay_order_id,
            razorpay_signature: data.razorpay_signature,
          }),
        );
      })
      .catch(error => {
        console.log('Payment failed/cancelled', error);
        if (error?.description?.includes('payment_cancelled')) {
          Alert.alert('Payment Cancelled ❌', 'You cancelled the payment.');
        } else {
          Alert.alert(
            'Payment Failed ⚠️',
            error.description || 'Something went wrong. Please try again.',
          );
        }
      });
  };

  return (
    <BlueWhiteBackground
      headerHeight={90}
      BlueWhiteBackgroundStyle={{ backgroundColor: colors.white }}
    >
      <HeaderComponent
        showBack={true}
        IconColor={GlobalStyles.blackcolor.color}
        title={config.CheckOutDetailsScreen.title}
        onBackPress={handleBackPress}
        titleStyle={[
          GlobalStyles.headertitle,
          GlobalStyles.blackcolor,
          fontW('600'),
          fS(16),
        ]}
        containerStyle={[
          GlobalStyles.Full_widthLine,
          {
            paddingBottom: GlobalStyles.margin_top10.marginTop,
          },
        ]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ backgroundColor: colors.white }]}
      >
        <CardContainer style={[getShadowWithElevation(1), paddingH(20)]}>
          <CustomText
            title={const_fullName}
            textStyle={[GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput
              placeholder={fullName}
              value={fullName}
              onChangeText={setFullName}
            />
          </ViewOutlined>

          <CustomText
            title={const_pancard_number}
            textStyle={[GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput
              placeholder={'e.g. ABCDE1234F'}
              value={PanCard.toUpperCase()}
              onChangeText={setPanCard}
            />
          </ViewOutlined>
          <View style={[GlobalStyles.viewRow]}>
            <CustomText
              title={config.CheckOutDetailsScreen.gstNo}
              textStyle={[GlobalStyles.margin_top10]}
            />
            <CustomText
              title={config.CheckOutDetailsScreen.optional}
              textStyle={[
                GlobalStyles.greyColorText,
                GlobalStyles.margin_top10,
              ]}
            />
          </View>
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput
              placeholder={'e.g. 22AAAAA0000A1Z5'}
              value={GSTNumber}
              onChangeText={setGSTNumber}
            />
          </ViewOutlined>
          <View style={[GlobalStyles.viewRow]}>
            <CustomText
              title={config.CheckOutDetailsScreen.legalCoName}
              textStyle={[GlobalStyles.margin_top10]}
            />
            <CustomText
              title={config.CheckOutDetailsScreen.optional}
              textStyle={[
                GlobalStyles.greyColorText,
                GlobalStyles.margin_top10,
              ]}
            />
          </View>
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },
            ]}
          >
            <CustomTextInput
              placeholder={'Your company name'}
              value={companyName}
              onChangeText={setLegalCompany}
            />
          </ViewOutlined>

          {/* <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
              },]}>
            <CustomTextInput placeholder={pinCode} value={pinCode} onChangeText={setPinCode} maxLength={6} />
          </ViewOutlined> */}

          <CustomText
            title={config.CheckOutDetailsScreen.Address}
            textStyle={[GlobalStyles.margin_top10]}
          />
          <ViewOutlined
            viewStyle={[
              GlobalStyles.borderStyles,
              {
                borderColor: Colors.borderBottomColor,
                borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
                height: GlobalStyles.playGradientBox.height,
              },
            ]}
          >
            <CustomTextInput
              placeholder={''}
              multiline
              value={address}
              onChangeText={setAddress}
            />
          </ViewOutlined>

          <View style={[GlobalStyles.viewRow]}>
            <View style={[GlobalStyles.flexOne, mr(15)]}>
              <CustomText
                title={const_state}
                textStyle={[GlobalStyles.margin_top10]}
              />

          <PressableOpacity
  onPress={() => {
    navigation.navigate('StateCitySelector', {
      type: 'state',
      onSelect: (selected: any) => {
        setState(selected.name); // updates local state
          setStateId(selected.id);
        setCity(''); // reset city when state changes
        setCityId('')
      
      },
    });
  }}>
              <ViewOutlined
                viewStyle={[
                  GlobalStyles.borderStyles,
                  {
                    borderColor: Colors.borderBottomColor,
                    borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
                  },]}>
                <CustomTextInput placeholder={const_state} value={state} onChangeText={setState} editable={false} />
              </ViewOutlined>
              </PressableOpacity>
            </View>
          </View>

          <View style={[GlobalStyles.flexOne]}>
            <CustomText
              title={const_city}
              textStyle={[GlobalStyles.margin_top10]}
            />
            <PressableOpacity
              onPress={() => {
                if (!stateId) {
                  showAlert('Please select a state first.');
                  return;
                }

                navigation.navigate('StateCitySelector', {
                  type: 'city',
                  stateId: stateId, // Pass selected state ID
                  onSelect: (selected: any) => {
                    setCity(selected.name);
                    setCityId(selected.id);
                  },
                });
              }}
            >
              <ViewOutlined
                viewStyle={[
                  GlobalStyles.borderStyles,
                  {
                    borderColor: Colors.borderBottomColor,
                    borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
                  },
                ]}
              >
                <CustomTextInput
                  placeholder={const_city}
                  value={city}
                  onChangeText={setCity}
                  editable={false}
                />
              </ViewOutlined>
            </PressableOpacity>
          </View>

          <View style={[GlobalStyles.flexOne, mr(15)]}>
            <CustomText
              title={const_pincode}
              textStyle={[GlobalStyles.margin_top10]}
            />
            <ViewOutlined
              viewStyle={[
                GlobalStyles.borderStyles,
                {
                  borderColor: Colors.borderBottomColor,
                  borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
                },
              ]}
            >
              <CustomTextInput
                placeholder={const_pincode}
                value={pinCode}
                onChangeText={setPinCode}
              />
            </ViewOutlined>
          </View>
        </CardContainer>
        <View style={[CartStyles.totalView]}>
          <View
            style={[
              CartStyles.viewSubTotal,
              GlobalStyles.ZuvyDashBoardContainer,
              mt(2),
            ]}
          >
            <CustomText
              title={const_totalAmount}
              textStyle={[
                CartStyles.itemTotalText,
                fS(13),
                textColor(colors.grey),
              ]}
            />
            <CustomText
              title={`₹${data?.amount.toFixed(2)}`}
              textStyle={[
                FontStyles.headingText,
                fontColor(Colors.primaryColor),
                fontW('600'),
                fS(16),
              ]}
            />
          </View>
          <CustomButton
            leftIcon={<CartSVG />}
            title={proceed}
            textStyles={[fS(14), pl(5)]}
            onPress={() => HandlePayment()}
            buttonStyle={[
              GlobalStyles.ZuvyDashBoardContainer,
              mb(0),
              GlobalStyles.containerPaddings,
            ]}
          />

          <CustomText
            title={securePayment}
            textStyle={[
              CartStyles.itemTotalText,
              GlobalStyles.containerPaddings,
              mb(10),
              fS(12),
              textColor(colors.grey),
            ]}
          />
        </View>
      </ScrollView>
    </BlueWhiteBackground>
  );
};

export default React.memo(CheckOutDetail);
