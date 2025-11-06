import React, { useState } from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface DropdownItem {
  label: string;
  value: string | number;
}

interface DropdownAtomProps {
  label?: string;
  data: DropdownItem[];
  placeholder?: string;
  searchPlaceholder?: string;
  selectedValue?: string | number | null;
  onSelect: (value: string | number) => void;
  iconName?: string; // e.g. "Safety"
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
}

const DropdownAtom: React.FC<DropdownAtomProps> = ({
  label = 'Select Item',
  data,
  placeholder = 'Select item',
  searchPlaceholder = 'Search...',
  selectedValue = null,
  onSelect,
  iconName = 'Safety',
  containerStyle,
  dropdownStyle,
  labelStyle,
  disabled = false,
}) => {
  const [value, setValue] = useState<string | number | null>(selectedValue);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }, labelStyle]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          dropdownStyle,
          isFocus && { borderColor: 'blue' },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name={iconName}
            size={20}
          />
        )}
        disable={disabled}
      />
    </View>
  );
};

export default DropdownAtom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
