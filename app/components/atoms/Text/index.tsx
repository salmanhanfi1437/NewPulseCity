import React from 'react';
import { GestureResponderEvent, StyleProp, Text,TextProps, TextStyle } from 'react-native';


interface CustomTextProps extends TextProps {
    title? : any;
    textStyle? : StyleProp<TextStyle>;
    underline? : boolean;
    onPress? : (event: GestureResponderEvent) => void;
    disable?: boolean;
}

export const CustomText: React.FC<CustomTextProps> = ({ title, textStyle,underline,onPress }) => {
  return <Text  onPress={onPress} style={[textStyle, underline && { textDecorationLine: 'underline' },


  ]}>{title}</Text>;
};
