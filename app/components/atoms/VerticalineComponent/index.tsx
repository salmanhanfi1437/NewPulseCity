import React from 'react';
import { View, StyleSheet } from 'react-native';

const VerticalLine = ({ height = 20, color = '#ccc', margin = 10 }) => {
  return <View style={[styles.line, { height, backgroundColor: color, marginHorizontal: margin }]} />;
};

const styles = StyleSheet.create({
  line: {
    width: 1,
    borderRadius: 1,
  },
});

export default VerticalLine;
