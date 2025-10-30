import React from 'react';
import { Pressable, StyleProp, StyleSheet,ViewStyle } from 'react-native';
import { ms } from 'react-native-size-matters';
import { Colors, Typography } from '../../../styles';
import ViewRounded10 from '../ViewRounded10';
import FontStyles from '../../../styles/FontStyles';
import { ml } from '../../../utils/spaces';
import PressableOpacity from '../PressableOpacity';

type ButtonProps = {

    title? : string,
    onPress? : () => void;
    disabled? : boolean;
    viewStyle? : StyleProp<ViewStyle> 
}

const Button = ({title,onPress,disabled,viewStyle} : ButtonProps) => {

    return(
        <Pressable onPress={onPress}>
        <ViewRounded10
                                        title={title}
                                        titleStyle={[styles.loginText]}
                                        containerStyle={[styles.btnLogin,viewStyle]}
                                        disabled={disabled}/>

                                        </Pressable>
                                    );
};

const styles = StyleSheet.create({
     loginText: {
            fontSize: ms(20),
            color: Colors.white,
            fontWeight: '700',
            alignSelf: 'center',
            letterSpacing: ms(2),
        },
        btnLogin: {
                color: Colors.primaryColor,
                alignSelf: 'center',
                backgroundColor: Colors.primaryColor,
                width: '100%',
            },
});

export default React.memo(Button);
