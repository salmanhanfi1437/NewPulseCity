import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

import ZuvyDashBoard from '../../../screens/DashBoard';
import QRManageMent from '../../../screens/QrManagement';
import UserProfile from '../../../screens/UserProfile';
import NotificationScreen from '../../../screens/NotificationScreen';

import TabIcons from '../../../components/atoms/TabIcons';
import {
  ActiveNotificationSVG,
  ActiveQrSVG,
  HomeActiveSVG,
  HomeSVG,
  NotificationTabSVG,
  ProfileAcitveSVG,
  ProfileTabSVG,
  QrTabSVG,
} from '../../../assets/svg';
import GlobalStyles from '../../../styles/GlobalStyles';
import { home, qr_code } from '../../../types/constants';
import { ClearInitialTab } from '../../../screens/DashBoard/dashboardSlice';

const Tab = createBottomTabNavigator();

const MerchantTabs = ({ navigation }) => {
  const { initialTab } = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (initialTab && navigation) {
  //     navigation.jumpTo(initialTab); // Switch to the desired tab
  //     dispatch(ClearInitialTab()); // reset it so it doesn't repeat
  //   }
  // }, [initialTab, navigation]);

  return (
    <SafeAreaView style={GlobalStyles.flexOne}>
      <Tab.Navigator
  initialRouteName={initialTab?.toString() || 'Home'} // fallback to 'Home'
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: GlobalStyles.tabBarStyle,
        }}>
        <Tab.Screen
          name="Home"
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
                title="Notification"
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
                title="Profile"
                ActiveIcon={ProfileAcitveSVG}
                InActiveIcon={ProfileTabSVG}/>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default React.memo(MerchantTabs);
