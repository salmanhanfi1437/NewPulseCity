import { TextStyle } from 'react-native';
const getDynamicTextStyle = (
  size?: number,
  color?: string,
  marginVertical?: number,
  margin?: number,
  fontWeight?: TextStyle['fontWeight'],
) => ({
  fontSize: size,
  color,
  marginVertical,
  margin,
  fontWeight,
});
export default getDynamicTextStyle;
