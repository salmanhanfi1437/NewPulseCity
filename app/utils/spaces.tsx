import { ms, mvs } from "react-native-size-matters";
import CartStyles from "../screens/YourCartScreen/styles";

// this  will provide us  margin top styles
export const mt = (value : number) => {
  return { marginTop: value };
};

export const flexGrow = (value : number) =>{
  return {flexGrow:value}
}

export const ml = (value : number) => {
  return { marginLeft: mvs(value) };
};

export const mr = (value : number) => {
  return { marginRight: mvs(value) };
};

export const mb = (value : number) => {
  return { marginBottom: mvs(value) };
};


export const pt = (value : number) => {
  return { paddingTop: mvs(value) };
};

export const pl = (value : number) => {
  return { paddingLeft: mvs(value) };
};

export const pr = (value : number) => {
  return { paddingRight: mvs(value) };
};

export const pb = (value : number) => {
  return { paddingBottom: mvs(value) };
};

export const fontColor = (value : string) => {
  return {color : value}
}


export const bgColor = (value : string) => {
  return {backgroundColor : value}
}

export const borderWidth = (value : number) => {
  return {borderWidth : ms(value)}
}

export const padding = (value : number) => {
  return {padding : mvs(value)}
}

export const textColor = (value : string) => {
  return {color : value}
}

export const textIncludedStyle = (marginTop: number) => {
  return [CartStyles.textincluded, mt(mvs(marginTop))];
};
