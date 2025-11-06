import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import BackgroundPrimaryColor from '../../components/atoms/BackgroundPrimaryColor';
import { signup, const_name, const_email, login, const_howtouseZuvy, alreadyhaveAccount, sign_in, letsgetstarted, yourCart, const_fcmToken, enter } from '../../types/constants';
import { Colors, Typography } from '../../styles';
import { ms, mvs } from 'react-native-size-matters';
import TextInputMic from '../../components/atoms/TextInputMic';
import { CustomText } from '../../components/atoms/Text';
import { TextInput } from 'react-native-gesture-handler';
import GlobalStyles from '../../styles/GlobalStyles';
import { SignupProps } from '../../navigation/types';
import { fontW, height, mb, mt } from '../../utils/spaces';
import PressableOpacity from '../../components/atoms/PressableOpacity';
import FontStyles from '../../styles/FontStyles';
import Button from '../../components/atoms/Button';
import DropdownAtom from '../../components/atoms/DropDown';
import secureStorage from '../../utils/secureStorage';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useDispatch } from 'react-redux';
import { RoleRequest, SignupRequest } from './signupSlice';
import { useTranslation } from 'react-i18next';


const SignupScreens = ({ navigation, route }: SignupProps) => {

  const { mobile } = route.params;
  console.log('Mobile ' + mobile);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('DISTRIBUTOR');

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const mobileNumberRef = useRef<TextInput>(null);

  const { error, singupData, roleData } = useSelector((state: RootState) => state.signup);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    console.log('111')
    dispatch(RoleRequest());

  }, []);


  useEffect(() => {
    if (roleData || error) {
      console.log('RolesDara ' + roleData);
      if (roleData?.success) {

      } else {
        showAlert(error?.message)
      }
    }
  }, [roleData, error])

  useEffect(() => {
    if (singupData || error) {
      console.log('SignupResponse' + singupData);
      if (singupData?.success) {
        navigation.replace(yourCart);
      }
      else if (error?.message) {
        showAlert(error?.message)
      }
    }

  }, [singupData, error])

  const handleRegister = async () => {
    const fcmToken = await secureStorage.getItem(const_fcmToken);

    if (validation()) {
      console.log('Api Called')
      dispatch(SignupRequest({ mobile, name, email, role, password: '123456', fcmToken, deviceType: Platform.OS.toUpperCase() }))
    }
  }

  const validation = () => {
    if (name == '') {
      showAlert(`${t(const_name)} ${t(enter)} `)
      return false;
    } else if (email === '') {
      return false;
    }

    return true;
  };


  return (
    <BackgroundPrimaryColor title={letsgetstarted}>
      <View style={[GlobalStyles.flexOne, mt(20)]}>
        <CustomText
          title={const_name}
          textStyle={[FontStyles.headingText, mt(10)]}
        />

        <TextInputMic
          ref={nameRef}
          value={name}
          onChangeText={setName}
          placeholder={const_name}
          keyboardType="default"
          style={FontStyles.txtInput}
          returnKeyType='next'
          onSubmitEditing={() => emailRef?.current?.focus()} />


        <CustomText title={const_email} textStyle={[FontStyles.headingText, mt(20)]} />


        <TextInputMic
          ref={emailRef}
          value={email}
          onChangeText={setEmail}
          placeholder={const_email}
          keyboardType="email-address"
          style={FontStyles.txtInput}
          returnKeyType='next'
          onSubmitEditing={() => mobileNumberRef?.current?.focus()} />


        <CustomText title={const_howtouseZuvy} textStyle={[FontStyles.headingText, mt(20)]} />

        <DropdownAtom
          data={roleData?.data}
          placeholder={const_howtouseZuvy}
          selectedValue={role}               // ✅ show current value
          onSelect={(val) => setRole(val)}   // ✅ update state on select
        />

        <Button
          title={signup}
          onPress={handleRegister}
          viewStyle={[mt(30)]} />

      </View>
      <View style={[GlobalStyles.viewRow, GlobalStyles.bottomFooter]}>
        <CustomText title={alreadyhaveAccount} textStyle={[FontStyles.subText, GlobalStyles.viewCenter,]} />
        <PressableOpacity onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: login }],
        })}>
          <CustomText title={sign_in} textStyle={[FontStyles.headingText, GlobalStyles.viewCenter, styles.signInText]} underline={true} />
        </PressableOpacity>
      </View>
    </BackgroundPrimaryColor>

  )
}

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
