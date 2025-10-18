import React from 'react';
import { Text,TextProps, TextStyle } from 'react-native';


interface CustomTextProps extends TextProps {
    title? : any;
    textStyle? : TextStyle;
}

export const CustomText: React.FC<CustomTextProps> = ({ title, textStyle }) => {
  return <Text style={[textStyle]}>{title}</Text>;
};
