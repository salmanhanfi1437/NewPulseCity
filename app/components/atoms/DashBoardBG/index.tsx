import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../../styles/GlobalStyles';
import ZuvyHeader from '../DashboardHeaderComponent';
import { Colors } from '../../../styles';
const { height } = Dimensions.get('window');

interface BlueWhiteBackgroundProps {
  children: ReactNode;
  headerHeight?: number;
}

const BlueWhiteBackground = ({
  children,
  headerHeight = 80,
}: BlueWhiteBackgroundProps) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={Colors.zuvyPrimaryGradient}
        locations={[0, 0.32, 0.32]}
        style={GlobalStyles.gradient}
      />
      <View
        style={[GlobalStyles.contentContainer, { paddingTop: headerHeight }]}
      >
        {children}
      </View>
    </View>
  );
};
export default BlueWhiteBackground;
