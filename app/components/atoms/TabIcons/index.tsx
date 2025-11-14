import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';
import GlobalStyles from '../../../styles/GlobalStyles';
import { Colors } from '../../../styles';
import colors from '../../../styles/colors';

interface TabIconsProps {
  focused?: boolean;
  title?: string;
  ActiveIcon?: any;
  InActiveIcon?: any;
  // ActiveIconColor? : string
}

export default function TabIcons({
  focused,
  title,
  ActiveIcon,
  InActiveIcon,
}: TabIconsProps) {
  return (
    <View style={[GlobalStyles.tabsView]}>
      {focused ? (
        <ActiveIcon
          width={ms(18)}
          height={ms(18)}
          color={colors.primaryColor}
        />
      ) : (
        <InActiveIcon width={ms(18)} height={ms(18)} color={colors.grey} />
      )}
      <Text
        ellipsizeMode="clip"
        style={[
          GlobalStyles.tabsText,
          {
            color: focused ? Colors.primaryColor : Colors.grey,
            marginTop: mvs(3),
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}
