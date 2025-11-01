import React from "react";
import { StyleSheet,View,Text, Settings } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeActiveSVG, HomeSVG } from "../../../assets/svg";
import { createStackNavigator } from "@react-navigation/stack";
import { MerchantTabParamList, RootStackParamList } from "../../types";
import HomeScreen from "../../../screens/merchantTabs/HomeScreen";
import { analytics, home, network, qr_code, settings } from "../../../types/constants";
import TabIcons from "../../../components/atoms/TabIcons";
import GlobalStyles from "../../../styles/GlobalStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import ZuvyDashBoard from "../../../screens/DashBoard";
import QRManageMent from "../../../screens/QrManagement";


const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<MerchantTabParamList>();

const MerchantTabs = () => {

    return(
        <SafeAreaView style={GlobalStyles.flexOne}>
        <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: GlobalStyles.tabBarStyle}}
    >
      <Tab.Screen
        name={'Home'}
        component={ZuvyDashBoard}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} title={home} ActiveIcon={HomeActiveSVG} InActiveIcon={HomeSVG}/>),
        }}/>

      <Tab.Screen
        name="Analytics"
        component={QRManageMent}
        options={{
          tabBarIcon: ({ focused }) => (
                       <TabIcons focused={focused} title={analytics} ActiveIcon={HomeActiveSVG} InActiveIcon={HomeSVG}/>
          ),
        }}
      />

      <Tab.Screen
        name="QRCode"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} title={qr_code} ActiveIcon={HomeActiveSVG} InActiveIcon={HomeSVG}/>

          ),
        }}
      />

      <Tab.Screen
        name="Network"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
          <TabIcons focused={focused} title={network} ActiveIcon={HomeActiveSVG} InActiveIcon={HomeSVG}/>
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
        <TabIcons focused={focused} title={settings} ActiveIcon={HomeActiveSVG} InActiveIcon={HomeSVG}/>

          ),
        }}
      />
    </Tab.Navigator>
    </SafeAreaView>
  );
}

export default React.memo(MerchantTabs);