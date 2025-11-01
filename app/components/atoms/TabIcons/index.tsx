import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { ms, mvs } from "react-native-size-matters";
import GlobalStyles from "../../../styles/GlobalStyles";
import { Colors } from "../../../styles";

interface TabIconsProps {
    focused? : boolean;
    title? : string;
    ActiveIcon? : any;
    InActiveIcon? : any;
}

export default function TabIcons({focused,title,ActiveIcon,InActiveIcon} : TabIconsProps) {
    return(
      <View style={[GlobalStyles.tabsView]}>
      {focused ? (
        <ActiveIcon width={ms(20)} height={ms(20)} />
      ) : (
        <InActiveIcon width={ms(20)} height={ms(24)} />
      )}
      <Text
       ellipsizeMode="clip"
        style={[GlobalStyles.tabsText,{
          color: focused ? Colors.primaryColor : Colors.grey_50,marginTop: mvs(3)}]}>
        {title}
      </Text>
    </View>
  );
}