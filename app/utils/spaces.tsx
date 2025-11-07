import { ms, mvs } from 'react-native-size-matters';
import CartStyles from '../screens/YourCartScreen/styles';
import { DimensionValue } from 'react-native';
import { position } from 'native-base/lib/typescript/theme/styled-system';

// this  will provide us  margin top styles
export const mt = (value: DimensionValue) => {
  return { marginTop: value };
};

export const flexGrow = (value: number) => {
  return { flexGrow: value };
};

export const ml = (value: number) => {
  return { marginLeft: mvs(value) };
};

export const mr = (value: number) => {
  return { marginRight: mvs(value) };
};

export const height = (value: number) => {
  return { height: value };
};

export const mb = (value: number) => {
  return { marginBottom: mvs(value) };
};

export const pt = (value: number) => {
  return { paddingTop: mvs(value) };
};

export const pl = (value: number) => {
  return { paddingLeft: mvs(value) };
};

export const pr = (value: number) => {
  return { paddingRight: mvs(value) };
};

export const pb = (value: number) => {
  return { paddingBottom: mvs(value) };
};

export const fontColor = (value: string) => {
  return { color: value };
};
export const fS = (value: number) => {
  return { fontSize: ms(value) };
};

export const borderRadius = (value: number) => {
  return { borderRadius: ms(value) };
};

export const bgColor = (value: string) => {
  return { backgroundColor: value };
};

export const borderWidth = (value: number) => {
  return { borderWidth: ms(value) };
};

export const padding = (value: number) => {
  return { padding: mvs(value) };
};

export const textColor = (value: string) => {
  return { color: value };
};

export const tAlign = (value: string) => {
  return { textAlign: value };
};

export const bR = (value: number) => {
  return { borderRadius: ms(value) };
};

export const width = (value: number) => {
  return { width: value };
};

export const Left = (value: number) => {
  return { left: value };
};
export const Top = (value: DimensionValue) => {
  return { top: value };
};

export const bottom = (value: DimensionValue) => {
  return { bottom: value };
};
export const marginVertical = (value: number) => {
  return { marginVertical: value };
};

export const paddingH = (value: number) => {
  return { paddingHorizontal: ms(value) };
};

export const fontW = (
  value:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
) => {
  return { fontWeight: value };
};

export const viewPostion = (value: 'absolute' | 'relative' | 'static') => {
  return { position: value };
};

export const alignCenter = (value:string)=>{
  return {alignCenter:value}
}

export const textIncludedStyle = (marginTop: number) => {
  return [CartStyles.textincluded, mt(mvs(marginTop))];
};


