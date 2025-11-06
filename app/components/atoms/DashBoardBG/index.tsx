import React, { ReactNode } from 'react';
import { View, Dimensions, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../../styles/GlobalStyles';
import { Colors } from '../../../styles';
const { height } = Dimensions.get('window');

interface BlueWhiteBackgroundProps {
  children: ReactNode;
  headerHeight?: number;
  BlueWhiteBackgroundStyle?: ViewStyle | ViewStyle[];
  LinearView?: boolean;
  LinearViewStyles?: ViewStyle | ViewStyle[];
  linearLocation ?:number[]
}

const BlueWhiteBackground = ({
  children,
  headerHeight = 80,
  BlueWhiteBackgroundStyle,
  LinearView,
  LinearViewStyles,
  linearLocation= [0, 0.32, 0.32]
}: BlueWhiteBackgroundProps) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={Colors.zuvyPrimaryGradient}
        locations={linearLocation}
        style={[
        GlobalStyles.gradient,
          LinearViewStyles,
        ]}
      />
      {LinearView ? (
        <>{children}</>
      ) : (
        <View
          style={[
            GlobalStyles.contentContainer,
            { paddingTop: headerHeight },
            BlueWhiteBackgroundStyle,
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
};
export default BlueWhiteBackground;
