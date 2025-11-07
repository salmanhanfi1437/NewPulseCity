import React from 'react';
import { StyleSheet, View, Text, Settings } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ActiveNotificationSVG,
  ActiveQrSVG,
  HomeActiveSVG,
  HomeSVG,
  NotificationTabSVG,
  ProfileTabSVG,
  QrTabSVG,
} from '../../../assets/svg';
import { createStackNavigator } from '@react-navigation/stack';
import { MerchantTabParamList, RootStackParamList } from '../../types';
import HomeScreen from '../../../screens/merchantTabs/HomeScreen';
import {
  analytics,
  home,
  network,
  qr_code,
  settings,
} from '../../../types/constants';
import TabIcons from '../../../components/atoms/TabIcons';
import GlobalStyles from '../../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZuvyDashBoard from '../../../screens/DashBoard';
import QRManageMent from '../../../screens/QrManagement';
import { Colors } from '../../../styles';
import UserProfile from '../../../screens/UserProfile';
import NotificationScreen from '../../../screens/NotificationScreen';


const Tab = createBottomTabNavigator<MerchantTabParamList>();

const MerchantTabs = () => {
  return (
    <SafeAreaView style={GlobalStyles.flexOne}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: GlobalStyles.tabBarStyle,
        }}>
        <Tab.Screen
          name={'Home'}
          component={ZuvyDashBoard}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcons
                focused={focused}
                title={home}
                ActiveIcon={HomeActiveSVG}
                InActiveIcon={HomeSVG}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcons
                focused={focused}
                title={'Notification'}
                ActiveIcon={ActiveNotificationSVG}
                InActiveIcon={NotificationTabSVG}
              />
            ),
          }}
        />

        <Tab.Screen
          name="QRCode"
          component={QRManageMent}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcons
                focused={focused}
                title={qr_code}
                ActiveIcon={ActiveQrSVG}
                InActiveIcon={QrTabSVG}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={UserProfile}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcons
                focused={focused}
                title={'Profile'}
                ActiveIcon={ProfileTabSVG}
                InActiveIcon={ProfileTabSVG}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default React.memo(MerchantTabs);
