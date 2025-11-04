import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { Colors } from '../../../styles';

const HorizontalLine = ({
  color = Colors.semiLight_grey,
  thickness = 1,
  marginVertical = ms(15),
}) => {
  return (
    <View
      style={[
        styles.line,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical: marginVertical,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    alignSelf: 'center',
  },
});

export default HorizontalLine;
