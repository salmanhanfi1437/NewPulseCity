import React, { ReactNode } from 'react';
import { ImageSourcePropType, Pressable, StyleProp, StyleSheet,TextStyle,ViewStyle } from 'react-native';
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
    viewStyle? : StyleProp<ViewStyle>;
    image?: ReactNode;
    titleStyle?: StyleProp<TextStyle>; 
}

const Button = ({title,onPress,disabled,viewStyle,image,titleStyle} : ButtonProps) => {

    return(
        <PressableOpacity onPress={onPress}>
        <ViewRounded10
                                        title={title}
                                        titleStyle={[FontStyles.buttonText,titleStyle]}
                                        containerStyle={[styles.btnLogin,viewStyle]}
                                        disabled={disabled}
                                        image={image}/>
                                        </PressableOpacity>
                                    );
};

const styles = StyleSheet.create({
    
        btnLogin: {
                backgroundColor: Colors.secondaryColor,
                alignSelf: 'center',
                width: '100%',
            },
});

export default React.memo(Button);
