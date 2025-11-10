import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import BackgroundPrimaryColor from '../../components/atoms/BackgroundPrimaryColor';
import {
  signup,
  const_name,
  const_email,
  login,
  const_howtouseZuvy,
  alreadyhaveAccount,
  sign_in,
  letsgetstarted,
  yourCart,
  const_fcmToken,
  enter,
  const_city,
  const_state,
  const_RESET_STORE,
} from '../../types/constants';
import { Colors, Typography } from '../../styles';
import { ms, mvs } from 'react-native-size-matters';
import TextInputMic from '../../components/atoms/TextInputMic';
import { CustomText } from '../../components/atoms/Text';
import { TextInput } from 'react-native-gesture-handler';
import GlobalStyles from '../../styles/GlobalStyles';
import { SignupProps } from '../../navigation/types';
import { fontW, height, mb, mr, mt } from '../../utils/spaces';
import PressableOpacity from '../../components/atoms/PressableOpacity';
import FontStyles from '../../styles/FontStyles';
import Button from '../../components/atoms/Button';
import { fS, fontColor, bR } from '../../utils/spaces';
import colors from '../../styles/colors';
import RememberMe from '../../components/atoms/CheckBox';
import secureStorage from '../../utils/secureStorage';
import { resetState, RoleRequest, SignupRequest } from './signupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';
import { capitalizeFirstLetter, isValidEmail } from '../../utils/helper';
import { useTranslation } from 'react-i18next';
import DropdownAtom from '../../components/atoms/DropDown';
import { RootState } from '../../redux/rootReducer';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import CustomTextInput from '../../components/atoms/TextInput';
import { CommonActions } from '@react-navigation/native';

const SignupScreens = ({ navigation, route }: SignupProps) => {

    const { mobile } = route.params || {}; // 👈 Safe destructuring
  console.log('Mobile ' + mobile);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('DISTRIBUTOR');
  const [stateId,setStateId] = useState(0);
  const [stateName,setStateName] = useState('');
  const [cityId,setCityId] = useState(0);
  const [cityName,setCityName] = useState('')
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const mobileNumberRef = useRef<TextInput>(null);
  
  const dispatch = useDispatch();
  
  const {t} = useTranslation()
  const { error, singupData, roleData } = useSelector((state: RootState) => state.signup);
const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; state?: boolean; city?: boolean }>({});

  useEffect(() => {
      
    if (roleData || error) {
      if (roleData?.success == true) {

      } else if(error) {
    showAlert(String(error?.message));
      }
    }
  }, [roleData, error])

  const handleRegister = async () => {
    const fcmToken = await secureStorage.getItem(const_fcmToken);

    if (validation()) {
     
      dispatch(SignupRequest({ mobile, name, email, role : role.toUpperCase(), password: '123456', fcmToken, deviceType: Platform.OS.toUpperCase(),stateId,cityId }))
    }
  }

const validation = () => {
  const newErrors: typeof errors = {};

  if (name.trim() === '') {
    newErrors.name = true;
    setErrors(newErrors);
    showAlert(`${t(const_name)} ${t(enter)}`);
    return false; // stop here
  }

  if (email.trim() === '' || !isValidEmail(email)) {
    newErrors.email = true;
    setErrors(newErrors);
    showAlert(`${t(const_email)} ${t(enter)}`);
    return false;
  }

  if (stateName.trim() === '') {
    newErrors.state = true;
    setErrors(newErrors);
    showAlert('Select State');
    return false;
  }

  if (cityName.trim() === '') {
    newErrors.city = true;
    setErrors(newErrors);
    showAlert('Select City');
    return false;
  }

  setErrors({}); // all good
  return true;
};




  useEffect(() =>{
    dispatch(RoleRequest());
  },[])


  useEffect(() =>{
    
    if(singupData?.success == true)
    {
         showAlert(String(singupData.message)); // ✅ cast to string

     
    dispatch({ type: const_RESET_STORE });  // 🔥 This will clear all slices and reset to initial state
      
      navigation.dispatch(
  CommonActions.reset({
    index: 0,
    routes: [{ name: 'PromoScreen' }], // Replace 'Dashboard' with your screen name
  })
);
    }
    else if(error)
    {
      showAlert(error?.message)
    }

  },[singupData,error])

  return (
    <BackgroundPrimaryColor title={letsgetstarted}>
      <View
        style={[
          GlobalStyles.flexOne,
          mt(20),
          GlobalStyles.ZuvyDashBoardContainer,
        ]}
      >
       <View style={[GlobalStyles.viewRow,GlobalStyles.alignItem]}>
  <CustomText
    title={t(const_name)}
    textStyle={FontStyles.headingText}
  />
  <CustomText
    title="*"
    textStyle={[FontStyles.headingText, { color: errors.name ? Colors.red : Colors.black }]} // Red asterisk
  />
</View>

       <TextInputMic
  ref={nameRef}
  value={name}
  onChangeText={(text) => {
    setName(text);
    if (errors.name) setErrors({ ...errors, name: false });
  }}
  placeholder={t(const_name)}
  keyboardType="default"
  returnKeyType="next"
  onSubmitEditing={() => emailRef?.current?.focus()}
  error={errors.name} // ✅ pass error prop
/>
{
  errors.name &&
<CustomText title={`Please enter ${t(const_name)}`} textStyle={[FontStyles.subTextError, mt(10),mb(10)]} />
}

        <View style={[GlobalStyles.viewRow,GlobalStyles.alignItem,mt(20)]}>
  <CustomText
    title={t(const_email)}
    textStyle={FontStyles.headingText}
  />
  <CustomText
    title="*"
    textStyle={[FontStyles.headingText, { color: errors.email ? Colors.red : Colors.black }]} // Red asterisk
  />
</View>


       <TextInputMic
  ref={emailRef}
  value={email}
  onChangeText={(text) => {
    setEmail(text);
    if (errors.email) setErrors({ ...errors, email: false });
  }}
  placeholder={t(const_email)}
  keyboardType="email-address"
  returnKeyType="next"
  onSubmitEditing={() => mobileNumberRef?.current?.focus()}
  error={errors.email} // ✅ pass error prop
/>
{
  errors.email &&
<CustomText title={`Please enter ${t(const_email)}`} textStyle={[FontStyles.subTextError, mt(10),mb(10)]} />
}
      
            <View style={[GlobalStyles.flexOne]}>
              
              <View style={[GlobalStyles.viewRow,GlobalStyles.alignItem,mt(20)]}>
  <CustomText
    title={t(const_state)}
    textStyle={FontStyles.headingText}
  />
  <CustomText
    title="*"
    textStyle={[FontStyles.headingText, { color: errors.state ? Colors.red : Colors.black }]} // Red asterisk
  />
</View>
          

          <PressableOpacity
  onPress={() => {
    navigation.navigate('StateCitySelector', {
      type: 'state',
      onSelect: (selected: any) => {
        setStateName(selected.name); // updates local state
        setStateId(selected.id)
        setCityId(0); // reset city when state changes
        setCityName(''); // reset city when state changes
      },
    });
  }}>
              <ViewOutlined
                viewStyle={[
                  GlobalStyles.TextBordercontainer,     errors.state && { borderBottomColor: 'red', borderBottomWidth: 1 },]}>
                <CustomTextInput placeholder={const_state} value={stateName} editable={false} />
              </ViewOutlined>
              </PressableOpacity>

          </View>

 <View style={[GlobalStyles.flexOne,mt(20)]}>
              
            <View style={[GlobalStyles.viewRow,GlobalStyles.alignItem]}>
  <CustomText
    title={t(const_city)}
    textStyle={FontStyles.headingText}
  />
  <CustomText
    title="*"
    textStyle={[FontStyles.headingText, { color: errors.city ? Colors.red : Colors.black }]} // Red asterisk
  />
</View>
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
        setCityName(selected.name);
        setCityId(selected.id)
      },
    });
  }}
>
  <ViewOutlined
    viewStyle={[
      GlobalStyles.TextBordercontainer,
          errors.city && { borderBottomColor: colors.red, borderWidth: 1 },

    ]}>
                
       <CustomTextInput placeholder={const_city} value={cityName} editable={false} />

  </ViewOutlined>
</PressableOpacity>

<CustomText title={const_howtouseZuvy} textStyle={[FontStyles.headingText, mt(20)]} />

        <DropdownAtom
          data={roleData?.data}
          placeholder={role}
          selectedValue={capitalizeFirstLetter(role)}               // ✅ show current value
          onSelect={(val : any) => setRole(val)}   // ✅ update state on select
/>
           
            </View>


        <Button
          title={signup}
          onPress={handleRegister}
          viewStyle={[mt(30)]} />

      </View>
      <View style={[GlobalStyles.viewRow, GlobalStyles.bottomFooter,mt(20)]}>
        <CustomText title={alreadyhaveAccount} textStyle={[FontStyles.subText, GlobalStyles.viewCenter,]} />
        <PressableOpacity onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: login }],
        })}>
          <CustomText title={sign_in} textStyle={[FontStyles.headingText, GlobalStyles.viewCenter, styles.signInText]} underline={true} />
        </PressableOpacity>
      </View>
    </BackgroundPrimaryColor>
  );
};

const styles = StyleSheet.create({
  signInText: {
    ...Typography.weights.boldU,
    color: Colors.primaryColor,
    marginLeft: mvs(5),
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D8D8D8',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#999',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
});

export default React.memo(SignupScreens);