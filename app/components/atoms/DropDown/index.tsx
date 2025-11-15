import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../styles/colors';
import GlobalStyles from '../../../styles/GlobalStyles';
import { mvs } from 'react-native-size-matters';
import FontStyles from '../../../styles/FontStyles';
import { pl } from '../../../utils/spaces';
import { const_howtouseZuvy } from '../../../types/constants';
import { useTranslation } from 'react-i18next';

export interface DropdownItem {
  label: string;
  value: string | number;
}

interface DropdownAtomProps {
  data: { name: string; description?: string }[];
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
  const formattedData = (data ?? []).map(item => ({
    label: item.name,
    value: item.name,
  }));

  const defaultValue =
    selectedValue || formattedData.find(item => item.value === 'DISTRIBUTOR')?.value || null;

  const [value, setValue] = useState<string | number | null>(defaultValue);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const {t} = useTranslation()

  useEffect(() => {
    if (defaultValue) {
      onSelect(defaultValue);
    }
  }, [defaultValue]);

  // ✅ Helper to capitalize only first letter
  const capitalizeFirstLetter = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

  return (
    <View style={[styles.container, containerStyle]}>
      <Dropdown
        style={[
          GlobalStyles.TextBordercontainer,
          dropdownStyle,
          isFocus && { borderColor: colors.primaryColor },
        ]}
        placeholderStyle={[FontStyles.txtInput, textStyle, pl(10)]} // ✅ left padding for placeholder
        selectedTextStyle={[
          FontStyles.txtInput,
          textStyle,
          pl(10), // ✅ left padding for selected value only
        ]}
        iconStyle={styles.iconStyle}
        data={formattedData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : t(const_howtouseZuvy)}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          const formattedValue = capitalizeFirstLetter(String(item.value));
          setValue(formattedValue);
          setIsFocus(false);
          onSelect(formattedValue);
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
    marginRight:mvs(20)
  },
});