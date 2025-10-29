import React, { ReactNode } from 'react';
import {View,StyleSheet, StyleProp,Pressable,ViewStyle,GestureResponderEvent, TextStyle,Text, ImageSourcePropType} from 'react-native';
import { ms, mvs } from 'react-native-size-matters';
import { CustomText } from '../Text';
import { useTranslation } from 'react-i18next';
import Image from '../Image';


type viewround10Props = {

    title? : string,
    containerStyle? : StyleProp<ViewStyle>;
    titleStyle? : StyleProp<TextStyle>;
    children?: React.ReactNode;
    onPress? : (event: GestureResponderEvent) => void;
    disabled?: boolean;
    image?: ReactNode;
}


const ViewRounded10 : React.FC<viewround10Props> = ({title,containerStyle,titleStyle,onPress,disabled,image} : viewround10Props) => {

    const Wrapper = onPress ? Pressable : View;
  const { t } = useTranslation();

    return (

        <Wrapper
        style={[styles.container,containerStyle]}
        onPress={onPress}
        android_ripple={onPress ? { color: 'rgba(0,0,0,0.1)' } : undefined}
        disabled={disabled}>
          {image}
            <CustomText title={t(title)}
            textStyle={titleStyle}/>   
            </Wrapper>
      
    )
}

const styles = StyleSheet.create({

container: {
    borderRadius: mvs(30),
    padding: mvs(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: ms(2) },
    shadowOpacity: mvs(0.15),
    shadowRadius: mvs(4),
    elevation: ms(5),
  },
  

})

export default React.memo(ViewRounded10);