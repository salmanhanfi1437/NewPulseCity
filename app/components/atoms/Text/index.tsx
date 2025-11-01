import React from 'react';
import { useTranslation } from 'react-i18next';
import { GestureResponderEvent, StyleProp, Text,TextProps, TextStyle } from 'react-native';


interface CustomTextProps extends TextProps {
    title? : any;
    textStyle? : StyleProp<TextStyle>;
    underline? : boolean;
    onPress? : (event: GestureResponderEvent) => void;
    disable?: boolean;
}

export const CustomText: React.FC<CustomTextProps> = ({ title, textStyle,underline,onPress }) => {
  const {t} = useTranslation();
  return <Text  onPress={onPress} style={[textStyle, underline && { textDecorationLine: 'underline' },
]}>{t(title)}</Text>;
};
