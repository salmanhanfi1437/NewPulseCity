import { s, vs, ms, mvs } from 'react-native-size-matters';

// english font family
const UE_FONT_LIGHT = 'Inter-Light';
const UE_FONT_MEDIUM = 'Inter-Medium';
const UE_FONT_REGULAR = 'Inter-Regular';
const UE_FONT_BOLD = 'Inter-Bold';

// sizes

const xSmall = () => ({
  // fontSize: ms(12),
  fontSize: 12,
});
const smallU = () => ({
  // fontSize: ms(14),
  fontSize: 14,
});
const regularU = () => ({
  // fontSize: ms(16),
  fontSize: 16,
});

const largeU = () => ({
  fontSize: ms(20),
});

// weights

const lightU = () => ({
  fontFamily: UE_FONT_LIGHT,
});
// comment for testing
const normalU = () => ({
  fontFamily: UE_FONT_REGULAR,
});

const mediumU = () => ({
  fontFamily: UE_FONT_MEDIUM,
});

const boldU = () => ({
  fontFamily: UE_FONT_BOLD,
});


// styles
const header1 = () => ({
  ...largeU(), // 20
  ...boldU(),
});

const header2 = () => ({
  ...largeU(), // 20
  ...normalU(),
});


const standardU = () => ({
  ...regularU(), // 16
  ...normalU(),
});

const standardLight = () => ({
  ...regularU(), // 16
  ...lightU(),
});

const standardBold = () => ({
  ...regularU(), // 16
  ...boldU(),
});

const subTextU = () => ({
  ...smallU(), // 14
  ...normalU(),
});

const subTextBold = () => ({
  ...smallU(), // 14
  ...boldU(),
});


const subTextLight = () => ({
  ...smallU(), // 14
  ...lightU(),
});

const smallTextU = () => ({
  ...xSmall(), // 12
  ...normalU(),
});

const smallTextBold = () => ({
  ...xSmall(), // 12
  ...boldU(),
});


const smallTextLight = () => ({
  ...xSmall(), // 12
  ...lightU(),
});
export default {
  size: {
    xSmall,
    smallU,
    regularU,
    largeU,
  },
  style: {
    header1,
    header2,

    standardU,
    standardLight,
    standardBold,
    subTextU,
    subTextBold,
    subTextLight,
    smallTextU,
    smallTextBold,
    smallTextLight,
  },
  weights: {
    lightU,
    mediumU,
    boldU,
    normalU,
  },
  fonts: {
    en: UE_FONT_REGULAR,
  },
};
