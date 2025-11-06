
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
} from '../../types/constants';
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
import { fS, fontColor, bR } from '../../utils/spaces';
import colors from '../../styles/colors';
import CheckBox from '@react-native-community/checkbox';
import RememberMe from '../../components/atoms/CheckBox';

const SignupScreens = ({ navigation }: SignupProps) => {
  const { fontSize, ...restFontStyle } = FontStyles.mainText;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [useZuvy, setZuvyUse] = useState('Distributor');

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const mobileNumberRef = useRef<TextInput>(null);
  const [remember, setRemember] = useState(false);
  const onMicPress = () => {
    console.log('Mic Press');
  };

  const handleRegister = () => {
    console.log('HandlePress');

    if (validation()) {
      console.log('Api Called');
      navigation.replace(yourCart);
    }
  };

  const validation = () => {
    if (name == '') {
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
          returnKeyType="next"
          onSubmitEditing={() => emailRef?.current?.focus()}
        />

        <CustomText
          title={const_email}
          textStyle={[FontStyles.headingText, mt(10)]}
        />

        <TextInputMic
          ref={emailRef}
          value={email}
          onChangeText={setEmail}
          placeholder={const_email}
          keyboardType="email-address"
          style={FontStyles.txtInput}
          returnKeyType="next"
          onSubmitEditing={() => mobileNumberRef?.current?.focus()}
        />

        <CustomText
          title={const_howtouseZuvy}
          textStyle={[FontStyles.headingText, mt(10)]}
        />

        <TextInputMic
          //   value={'Distributor'}
          onChangeText={setZuvyUse}
          placeholder={const_howtouseZuvy}
          keyboardType="default"
          editable={false}
          disabledMic={true}
          style={[FontStyles.txtInput]}
        />
       <RememberMe />

        <Button
          title={signup}
          onPress={handleRegister}
          titleStyle={[fS(ms(15)), fontColor(colors.black), fontW('500')]}
          viewStyle={[
            GlobalStyles.Custombutton,
            mt(65),
            bR(10),
            
            GlobalStyles.authBtn,
            height(60),
          ]}
        />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <CustomText title={'Or'} textStyle={[styles.orText]} />
          <View style={styles.line} />
        </View>
      </View>
      <View style={[GlobalStyles.viewRow, GlobalStyles.bottomFooter]}>
        <CustomText
          title={alreadyhaveAccount}
          textStyle={[
            FontStyles.headingText,
            GlobalStyles.viewCenter,
            fontColor(Colors.grey),
          ]}
        />
        <PressableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: login }],
            })
          }
        >
          <CustomText
            title={sign_in}
            textStyle={[
              FontStyles.headingText,
              GlobalStyles.viewCenter,
              styles.signInText,
            ]}
            underline={true}
          />
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