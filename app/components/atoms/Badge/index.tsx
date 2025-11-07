import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { ms } from 'react-native-size-matters';
import GlobalStyles from '../../../styles/GlobalStyles';

interface ComingSoonBadgeProps {
  text?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  fontSize?: number;
  textcolor?: string;
  textStyle?:TextStyle| TextStyle[];
}

const Badge: React.FC<ComingSoonBadgeProps> = ({
  text = '',
  backgroundColor = 'rgba(255, 255, 255, 0.2)',
  borderRadius = 15,
  padding = 5,
  fontSize = ms(8),
  textcolor,
  textStyle
}) => {
  return (
    <View
      style={[styles.container, { backgroundColor, borderRadius, padding }]}
    >
      <Text
        style={[GlobalStyles.playDurationText, { fontSize, color: textcolor },textStyle]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});

export default Badge;
