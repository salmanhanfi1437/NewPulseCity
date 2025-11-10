import React, { forwardRef } from 'react';
import {
  TextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Colors, Typography } from '../../../styles';
import { DropDownSVG } from '../../../assets/svg';
import { ms, mvs } from 'react-native-size-matters';
import PressableOpacity from '../PressableOpacity';
import GlobalStyles from '../../../styles/GlobalStyles';

interface TextInputWithMicProps extends RNTextInputProps {
  value?: any;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  editable?: boolean;
  maxLength?: number;
  style?: any;
  disabledMic?: boolean;
  onMicPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  error?: boolean;
  returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
  onSubmitEditing?: () => void;
}

const CustomTextInputMic = forwardRef<TextInput, TextInputWithMicProps>(
  (
    {
      value,
      onChangeText,
      placeholder,
      keyboardType = 'default',
      secureTextEntry = false,
      editable = true,
      maxLength,
      disabledMic = false,
      onMicPress,
      containerStyle,
      error = false,
      returnKeyType = 'done',
      onSubmitEditing,
    },
    ref,
  ) => {
    return (
      <View
        style={[
          GlobalStyles.TextBordercontainer,
          containerStyle,
          // ✅ if error, show red underline
          error
            ? { borderBottomColor: Colors.red, borderBottomWidth: 1 }
            : { borderBottomColor: Colors.grey_50, borderBottomWidth: 1 },
        ]}
      >
        <TextInput
          ref={ref}
          style={[styles.txtinputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={editable}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          placeholderTextColor={Colors.grey_50}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />

        {disabledMic && (
          <PressableOpacity onPress={onMicPress}>
            <DropDownSVG width={ms(25)} height={ms(25)} />
          </PressableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ms(50),
    paddingHorizontal: ms(10),
    // ⚠️ remove full border, use only bottom border dynamically
  },
  txtinputStyle: {
    fontSize: ms(15),
    color: Colors.black,
    fontWeight: '500',
    flex: 1,
    height: ms(50),
    ...Typography.weights.mediumU,
  },
});

export default React.memo(CustomTextInputMic);