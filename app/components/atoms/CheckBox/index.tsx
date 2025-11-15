import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 👈 make sure installed
import { ms } from 'react-native-size-matters';
import colors from '../../../styles/colors';
import { CustomText } from '../Text';
import FontStyles from '../../../styles/FontStyles';
import GlobalStyles from '../../../styles/GlobalStyles';
import { fontW, fS } from '../../../utils/spaces';

const RememberMe = ({ label = '', onChange }: any) => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleCheck}
      activeOpacity={0.8}
    >
      <Icon
        name={checked ? 'check-box' : 'check-box-outline-blank'}
        size={ms(20)}
        color={colors.primaryColor || '#007AFF'}
      />
      <CustomText
        title={label}
        textStyle={[
          FontStyles.headingText,
          GlobalStyles.viewCenter,
          fontW('200'),fS(12)
        ]}
      />
    </TouchableOpacity>
  );
};

export default RememberMe;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(10),
  },
  label: {
    fontSize: ms(14),
    color: colors.black || '#000',
    marginLeft: ms(8),
  },
});
