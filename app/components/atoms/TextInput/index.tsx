import React, { forwardRef } from 'react';
import { TextInput, TextInputProps as RNTextInputProps } from 'react-native';
import { Colors } from '../../../styles';

interface TextInputProps extends RNTextInputProps {
  value?: any;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  editable?: boolean;
  maxLength?: number;
  style?: any;
}

const CustomTextInput = forwardRef<TextInput, TextInputProps>(
  (
    {
      value,
      onChangeText,
      placeholder,
      keyboardType,
      secureTextEntry,
      editable,
      style,
      maxLength,
      ...rest
    },
    ref
  ) => {
    return (
      <TextInput
        ref={ref} // ✅ forward the ref correctly
        style={[style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        placeholderTextColor={Colors.grey_50}
        {...rest}
      />
    );
  }
);

export default React.memo(CustomTextInput);