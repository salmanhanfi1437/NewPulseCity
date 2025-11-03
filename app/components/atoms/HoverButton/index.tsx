import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors';

type HoverButtonProps = {
  onPress?: () => void;
  style?: ViewStyle;
};

const HoverButton = ({ onPress, style }: HoverButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.HoverButtonStyle, style]}
    >
      <MaterialIcons name="add" size={28} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  HoverButtonStyle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default HoverButton;
