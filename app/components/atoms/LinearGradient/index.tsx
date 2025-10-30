import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

type LinearGradientProps = {

    colors: string[]; // array of gradient colors
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}


const LinearGradients = ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
}: LinearGradientProps) => {

    return(
        <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={style}
    >
      {children}
    </LinearGradient>
    )
}

export default React.memo(LinearGradients);