import React from 'react';
import { TextInput,StyleSheet } from 'react-native';
import { Colors } from '../../../styles';

type TextInputProps = {

    value? : any;
    onChangeText? : (value : string) => void;
    placeholder? : string;
    keyboardType? : 'default' | 'numeric' | 'email-address' | 'phone-pad';
    secureTextEntry?: boolean;
    editable?: boolean;
      maxLength?: number; // ✅ Added here
    style?: any;

}

const CustomTextInput : React.FC<TextInputProps> = ({value,onChangeText,placeholder,keyboardType,secureTextEntry,editable,style,maxLength}) =>{

    return (

        <TextInput style={[style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        placeholderTextColor={Colors.grey_50}/>
    )
}

export default React.memo(CustomTextInput);