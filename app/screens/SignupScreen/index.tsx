import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet,View } from 'react-native';
import BackgroundPrimaryColor from '../../components/atoms/BackgroundPrimaryColor';
import { signup, welcome_to_zuvy,const_name,const_email,mobile_number, const_useOfZuvy, login, const_howtouseZuvy, alreadyhaveAccount, sign_in, letsgetstarted } from '../../types/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors, Typography } from '../../styles';
import { ms, mvs } from 'react-native-size-matters';
import ViewRounded10 from '../../components/atoms/ViewRounded10';
import TextInputMic from '../../components/atoms/TextInputMic';
import { CustomText } from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import { TextInput } from 'react-native-gesture-handler';
import GlobalStyles from '../../styles/GlobalStyles';
import { SignupProps } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import { flexGrow, mt } from '../../utils/spaces';
import PressableOpacity from '../../components/atoms/PressableOpacity';


const SignupScreens = ({navigation} : SignupProps) =>{

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [useZuvy,setZuvyUse] = useState('Distributor');
    const {t} = useTranslation();

    const nameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const mobileNumberRef = useRef<TextInput>(null);

    const onMicPress = () =>{
        console.log('Mic Press')
    }

    const handleRegister = () => {
        console.log('HandlePress');

        if(validation())
        {
            console.log('Api Called')
        }
    }

    const validation = () =>{
        if(name == '')
        {
        
            return false;
        }
        
        else if(email === '')
        {

            return false;
        }
       
        return true;
        
    }

    return(

        <BackgroundPrimaryColor title={t(letsgetstarted)}>
            <View style={GlobalStyles.flexOne}>
 <KeyboardAwareScrollView
                style={GlobalStyles.keyboardView}
                contentContainerStyle={flexGrow(1)}
                enableOnAndroid={true}
                extraScrollHeight={80}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <ScrollView
                    contentContainerStyle={flexGrow(1)}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    

                <ViewRounded10
                            title={t(signup)}
                            titleStyle={styles.singupText}
                            containerStyle={styles.viewRound}
                            disabled={false}/>

            <CustomText title={t(const_name)} textStyle={[GlobalStyles.headingText,mt(20)]} />

                            
                            <TextInputMic
                                ref={nameRef}
                                value={name}
                                onChangeText={setName}
                                placeholder={t(const_name)}
                                keyboardType="default"
                                style={GlobalStyles.txtInput}
                                returnKeyType='next'
                                onSubmitEditing={() => emailRef?.current?.focus()} />


                                     <CustomText title={t(const_email)} textStyle={[GlobalStyles.headingText,mt(20)]} />
   

                             <TextInputMic 
                             ref={emailRef}
                                value={email}
                                onChangeText={setEmail}
                                placeholder={t(const_email)}
                                keyboardType="email-address"
                                style={styles.txtinputStyle}
                                 returnKeyType='next'
                                onSubmitEditing={() => mobileNumberRef?.current?.focus()}/>


                                     <CustomText title={t(const_howtouseZuvy)} textStyle={[GlobalStyles.headingText,mt(20)]} />

                             <TextInputMic 
                                value={"Distributor"}
                                onChangeText={setZuvyUse}
                                placeholder={t(const_howtouseZuvy)}
                                keyboardType="default"
                                editable={false}
                                disabledMic={true}
                                style={styles.txtinputStyle}/>

                                <Button
                                                                title={t(signup)}
                                                                onPress={handleRegister}
                                                                viewStyle={styles.btnRegister}/>

                    </ScrollView>
                    </KeyboardAwareScrollView>

</View>
<View style={[GlobalStyles.viewRow,styles.alreadyAccount,GlobalStyles.bottomFooter]}>
<CustomText title={t(alreadyhaveAccount)} textStyle={[GlobalStyles.subText,styles.alreadyAccount]}/>
<PressableOpacity onPress={() => navigation.reset({
  index: 0,
  routes: [{ name: login }],
})}>
<CustomText title={t(sign_in)} textStyle={[GlobalStyles.headingText,styles.alreadyAccount,styles.signInText]} underline={true}/>
</PressableOpacity>
</View>
        </BackgroundPrimaryColor>

    )
}

const styles = StyleSheet.create({

       
     singupText: {
        fontSize: ms(20),
        color: Colors.black,
        fontWeight: '700',
        alignSelf: 'center',
        letterSpacing: ms(2),
    },
     viewRound: {
        backgroundColor: Colors.color_E5E7EB,
        justifyContent: 'center',
    },
     txtinputStyle: {
            fontSize: ms(15),
            color: Colors.black,
            fontWeight: '500',
            flex: 1,
            ...Typography.weights.mediumU,
        },
        btnRegister: {
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: mvs(40),
        width: '100%',
    },
      mobileNumberText: {
        fontSize: ms(20),
        color: Colors.black,
        fontWeight: '700',
        ...Typography.weights.boldU,
    },
    alreadyAccount:{
        alignSelf:'center',
        justifyContent:'center',
    },
    signInText:{
        ...Typography.weights.boldU,
        color:Colors.primaryColor,
        marginLeft:mvs(5)
    }
    //      useText: {
    //     fontSize: ms(15),
    //     color: Colors.black,
    //     fontWeight: '700',
    //     ...Typography.weights.mediumU,
    //     marginTop: mvs(20),
    //     alignSelf:'center',
    // },
})

export default React.memo(SignupScreens);