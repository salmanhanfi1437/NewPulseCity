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
import { isValidEmail } from '../../utils/helper';
import { useTranslation } from 'react-i18next';
import DropdownAtom from '../../components/atoms/DropDown';
import { RootState } from '../../redux/rootReducer';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import CustomTextInput from '../../components/atoms/TextInput';

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
     
      dispatch(SignupRequest({ mobile, name, email, role, password: '123456', fcmToken, deviceType: Platform.OS.toUpperCase(),stateId,cityId }))
    }
  }

  const validation = () => {
    if (name == '') {
      showAlert(`${t(const_name)} ${t(enter)} `)
      return false;
    } else if (email === ''|| !isValidEmail(email) ) {
            showAlert(`${t(const_email)} ${t(enter)} `)

      return false;
    }
    else if(stateName == '')
        {
          showAlert(`Select State`);
          return false;
        }
        else if(cityName == '')
        {
          showAlert(`Select City`);
          return false;
        }

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
      navigation.replace('PromoScreen');
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
          placeholder={role}
          selectedValue={role}               // ✅ show current value
          onSelect={(val : any) => setRole(val)}   // ✅ update state on select
        />

 <View style={[GlobalStyles.viewRow]}>

            <View style={[GlobalStyles.flexOne,mr(15)]}>
              
              <CustomText
                title={const_state}
                textStyle={[GlobalStyles.margin_top10]}/>
          

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
                  GlobalStyles.borderStyles,
                  {
                    borderColor: Colors.borderBottomColor,
                    borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
                  },]}>
                <CustomTextInput placeholder={const_state} value={stateName} editable={false} />
              </ViewOutlined>
              </PressableOpacity>

            </View>
          </View>

 <View style={[GlobalStyles.flexOne]}>
              
              <CustomText
                title={const_city}
                textStyle={[GlobalStyles.margin_top10]}/>
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
      GlobalStyles.borderStyles,
      {
        borderColor: Colors.borderBottomColor,
        borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius,
      },
    ]}
  >
                   <CustomTextInput placeholder={const_city} value={cityName} editable={false} />

  </ViewOutlined>
</PressableOpacity>
           
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