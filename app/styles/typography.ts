import { ms } from 'react-native-size-matters';
import { TextStyle } from 'react-native';

// Font families
const UE_FONT_LIGHT = 'Inter-Light';
const UE_FONT_MEDIUM = 'Inter-Medium';
const UE_FONT_REGULAR = 'Inter-Regular';
const UE_FONT_BOLD = 'Inter-Bold';

// Base helpers
const fontSize = (size: number): TextStyle => ({
  fontSize: ms(size),
});

const fontFamily = (weight: 'light' | 'regular' | 'medium' | 'bold' = 'regular'): TextStyle => {
  switch (weight) {
    case 'light':
      return { fontFamily: UE_FONT_LIGHT };
    case 'medium':
      return { fontFamily: UE_FONT_MEDIUM };
    case 'bold':
      return { fontFamily: UE_FONT_BOLD };
    default:
      return { fontFamily: UE_FONT_REGULAR };
  }
};

// 🔹 Core dynamic style creator
const createTextStyle = ({
  size = 14,
  weight = 'regular',
  color,
  lineHeight,
  textAlign,
}: {
  size?: number;
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  color?: string;
  lineHeight?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
} = {}): TextStyle => ({
  ...fontSize(size),
  ...fontFamily(weight),
  ...(color ? { color } : {}),
  ...(lineHeight ? { lineHeight } : {}),
  ...(textAlign ? { textAlign } : {}),
});

// Optional backward-compatible weight helpers
const weights = {
  lightU: () => fontFamily('light'),
  mediumU: () => fontFamily('medium'),
  boldU: () => fontFamily('bold'),
  normalU: () => fontFamily('regular'),
};

// 🔸 Predefined + dynamic
const Typography = {
  size: {
    dynamic: (size: number, weight: 'light' | 'regular' | 'medium' | 'bold' = 'regular', color?: string) =>
      createTextStyle({ size, weight, color }), // ✅ Dynamic size

    xSmall: (weight?: 'light' | 'regular' | 'medium' | 'bold') => createTextStyle({ size: 12, weight }),
    smallU: (weight?: 'light' | 'regular' | 'medium' | 'bold') => createTextStyle({ size: 14, weight }),
    regularU: (weight?: 'light' | 'regular' | 'medium' | 'bold') => createTextStyle({ size: 16, weight }),
    largeU: (weight?: 'light' | 'regular' | 'medium' | 'bold') => createTextStyle({ size: 20, weight }),
  },

  style: {
    header1: (color?: string) => createTextStyle({ size: 20, weight: 'bold', color }),
    header2: (color?: string) => createTextStyle({ size: 20, weight: 'regular', color }),
    standardU: (color?: string) => createTextStyle({ size: 16, weight: 'regular', color }),
    standardLight: (color?: string) => createTextStyle({ size: 16, weight: 'light', color }),
    standardBold: (color?: string) => createTextStyle({ size: 16, weight: 'bold', color }),
    subTextU: (color?: string) => createTextStyle({ size: 14, weight: 'regular', color }),
    subTextBold: (color?: string) => createTextStyle({ size: 14, weight: 'bold', color }),
    subTextLight: (color?: string) => createTextStyle({ size: 14, weight: 'light', color }),
    smallTextU: (color?: string) => createTextStyle({ size: 12, weight: 'regular', color }),
    smallTextBold: (color?: string) => createTextStyle({ size: 12, weight: 'bold', color }),
    smallTextLight: (color?: string) => createTextStyle({ size: 12, weight: 'light', color }),
    SmallText: (color?: string) => createTextStyle({ size: 11, weight: 'light', color }),
  },

  createTextStyle,
  fonts: { en: UE_FONT_REGULAR },
  weights,
};

export default Typography;
