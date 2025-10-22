import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet,View } from 'react-native';
import BackgroundPrimaryColor from '../../components/atoms/BackgroundPrimaryColor';
import { signup, welcome_to_zuvy } from '../../types/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors, Typography } from '../../styles';
import { ms, mvs } from 'react-native-size-matters';
import ViewRounded10 from '../../components/atoms/ViewRounded10';
import TextInputMic from '../../components/atoms/TextInputMic';
import { CustomText } from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import { TextInput } from 'react-native-gesture-handler';


const SignupScreens = () =>{

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [useZuvy,setZuvyUse] = useState('');
    const [mobileNumber,setMobileNumber] = useState('');


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
        else if(mobileNumber === '')
        {

            return false;
        }

        return true;
        
    }

    return(

        <BackgroundPrimaryColor title={welcome_to_zuvy}>

 <KeyboardAwareScrollView
                style={styles.keyboardView}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={80}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.mainCard}>


                <ViewRounded10
                            title={signup}
                            titleStyle={styles.singupText}
                            containerStyle={styles.viewRound}
                            disabled={false}/>
 <TextInputMic
                                ref={nameRef}
                                value={name}
                                onChangeText={setName}
                                placeholder={'Enter Name'}
                                keyboardType="default"
                                style={styles.txtinputStyle}
                                returnKeyType='next'
                                onSubmitEditing={() => emailRef?.current?.focus()} />
                            

                             <TextInputMic 
                             ref={emailRef}
                                value={email}
                                onChangeText={setEmail}
                                placeholder={'Enter Email'}
                                keyboardType="email-address"
                                style={styles.txtinputStyle}
                                 returnKeyType='next'
                                onSubmitEditing={() => mobileNumberRef?.current?.focus()}/>

                                 <TextInputMic 
                                 ref={mobileNumberRef}
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                                placeholder={'Enter Mobile Number'}
                                keyboardType="phone-pad"
                                style={styles.txtinputStyle}
                                returnKeyType='done'
                               />

                        {/* <CustomText title={"How do u want to use Zuvy ? "} textStyle={styles.useText} /> */}


                             <TextInputMic 
                                value={useZuvy}
                                onChangeText={setZuvyUse}
                                placeholder={'How do u want to use Zuvy ? '}
                                keyboardType="default"
                                editable={false}
                                disabledMic={true}
                                style={styles.txtinputStyle}/>


                                <Button
                                                                title={signup.toUpperCase()}
                                                                onPress={handleRegister}
                                                                viewStyle={styles.btnRegister}
                                                               
                                                            />
                                                    

                    </View>
                    </ScrollView>
                    </KeyboardAwareScrollView>


        </BackgroundPrimaryColor>

    )
}

const styles = StyleSheet.create({

       keyboardView: {
            flex: 1,
            backgroundColor: Colors.white,
            borderTopLeftRadius:ms(20),
            borderTopRightRadius:ms(20)
        },
          mainCard: {
                backgroundColor: Colors.white,
                borderTopLeftRadius: ms(30),
                borderTopRightRadius: ms(30),
                padding: mvs(15),
                height: '100%',
            },
     singupText: {
        fontSize: ms(20),
        color: Colors.black,
        fontWeight: '700',
        alignSelf: 'center',
        letterSpacing: ms(2),
    },
     viewRound: {
        backgroundColor: Colors.white,
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
        backgroundColor: Colors.primaryColor,
        width: '100%',
    },
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