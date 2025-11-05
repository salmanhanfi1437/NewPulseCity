import React, { forwardRef } from 'react';
import {
  TextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
} from 'react-native';
import { Colors, Typography } from '../../../styles';
import { DropDownSVG, MicSVG } from '../../../assets/svg';
import { ms, mvs, ViewStyle } from 'react-native-size-matters';
import PressableOpacity from '../PressableOpacity';

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
  viewStyle?: StyleProp<ViewStyle>;
  returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
  onSubmitEditing?: () => void;
}

const CustomTextInputMic = forwardRef<TextInput, TextInputWithMicProps>(
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
      disabledMic,
      onMicPress,
      viewStyle,
      returnKeyType,
      onSubmitEditing,
    },
    ref,
  ) => {
    return (
      <View style={[styles.container]}>
        <TextInput
          ref={ref} // ✅ forward the ref correctly
          style={styles.txtinputStyle}
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

        {/* {
        !disabledMic  &&
      <PressableOpacity
         onPress={onMicPress}>
                                 <MicSVG width={ms(30)} height={ms(30)} />
                             </PressableOpacity>
      } */}

        {disabledMic && (
          <PressableOpacity onPress={onMicPress}>
            <DropDownSVG width={ms(30)} height={ms(30)} />
          </PressableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: mvs(30),
    borderWidth: ms(1),
    borderColor: Colors.grey_50,
    paddingStart: ms(5),
    paddingEnd: ms(5),
    height: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: mvs(10),
  },
  txtinputStyle: {
    fontSize: ms(15),
    color: Colors.black,
    fontWeight: '500',
    flex: 1,
    height: ms(50),
    alignSelf: 'center',
    ...Typography.weights.mediumU,
  },
  micView: {
    alignSelf: 'center',
  },
});

export default React.memo(CustomTextInputMic);
