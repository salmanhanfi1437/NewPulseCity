import React from 'react';
import { View, StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';
import { flex, padding } from '../styles/ui';
import { colors } from '../styles';

interface Props {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<Props> = ({ children }) => {
  return (
    <View style={[flex(1), padding(mvs(10)), styles.wrapper]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white
  }
});

export default ScreenWrapper;