import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../../styles";
import { CustomText } from "../Text";
import GlobalStyles from "../../../styles/GlobalStyles";
import TabStyles from "../../../screens/NotificationScreen/styles";


export type RouteType = {
  key: string;
  title: string;
};

type CustomTabViewProps = {
  routes: RouteType[];
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  indicatorColor?: string;
};

const CustomTabView = ({
  routes,
  initialIndex = 0,
  onIndexChange,
  activeColor = Colors.primaryColor,
  inactiveColor = Colors.color_E5E7EB,
  backgroundColor = Colors.white,
  indicatorColor = Colors.primaryColor,
}: CustomTabViewProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    onIndexChange?.(index);
  };

  return (
    <View style={[GlobalStyles.viewRow, { backgroundColor }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {routes.map((route, index) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleTabPress(index)}
              style={TabStyles.tabs}
            >
              <CustomText
                title={route.title}
                textStyle={{
                  color: isActive ? activeColor : inactiveColor,
                  fontWeight: isActive ? "bold" : "normal",
                }}
              />
              {isActive && (
                <View
                  style={[
                    TabStyles.tabIndicator,
                    { backgroundColor: indicatorColor },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};


export default React.memo(CustomTabView);