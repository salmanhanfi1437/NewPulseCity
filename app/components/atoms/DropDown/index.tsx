import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../styles/colors';
import GlobalStyles from '../../../styles/GlobalStyles';
import { mvs } from 'react-native-size-matters';
import FontStyles from '../../../styles/FontStyles';

export interface DropdownItem {
  label: string;
  value: string | number;
}

interface DropdownAtomProps {
  data: { name: string; description?: string }[]; // matching your API data
  placeholder?: string;
  selectedValue?: string | number | null;
  onSelect: (value: string | number) => void;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const DropdownAtom: React.FC<DropdownAtomProps> = ({
  data,
  placeholder = 'Select item',
  selectedValue = null,
  onSelect,
  containerStyle,
  dropdownStyle,
  textStyle,
  disabled = false,
}) => {
  // Convert API data (name) to dropdown format
 const formattedData = (data ?? []).map(item => ({
  label: item.name,
  value: item.name,
}));

  // Set default to "DISTRIBUTOR"
  const defaultValue =
    selectedValue || formattedData.find(item => item.value === 'DISTRIBUTOR')?.value || null;

  const [value, setValue] = useState<string | number | null>(defaultValue);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  // Notify parent of initial default
  useEffect(() => {
    if (defaultValue) {
      onSelect(defaultValue);
    }
  }, [defaultValue]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Dropdown
        style={[
          GlobalStyles.viewRoundBorder,
          dropdownStyle,
          isFocus && { borderColor: colors.primaryColor },
        ]}
        placeholderStyle={[FontStyles.txtInput, textStyle]}
        selectedTextStyle={[FontStyles.txtInput, textStyle]}
        iconStyle={styles.iconStyle}
        data={formattedData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item.value);
        }}
        disable={disabled}
        search={false}
        renderRightIcon={() => (
          <AntDesign
            name={isFocus ? 'up' : 'down'}
            size={20}
            color={colors.primaryColor || '#555'}
          />
        )}
      />
    </View>
  );
};

export default DropdownAtom;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  
  iconStyle: {
    width: mvs(20),
    height: mvs(20),
  },
});
