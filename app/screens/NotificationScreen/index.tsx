import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CustomTabView, { RouteType } from '../../components/atoms/Tabs';
import { Colors } from '../../styles';
import Header from '../../components/atoms/Header';
import HeaderWithBackButton from '../../components/atoms/HeaderWithBackButton';
import { notifications } from '../../types/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import { mt } from '../../utils/spaces';
import { NotificationData, NotificationTabs } from '../../types/strings'; // 👈 imported reusable routes
import NotificationItems from '../../components/atoms/Notificationtems/index';
import HeaderComponent from '../../components/atoms/HeaderComponent';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import colors from '../../styles/colors';

const Notifications = () => {
  const [index, setIndex] = useState(0);

  const renderItem = ({ item }:any) => {
    return <NotificationItems data={item} />;
  };

  return (
    <BlueWhiteBackground
      headerHeight={70}
      BlueWhiteBackgroundStyle={{ backgroundColor: colors.white }}
    >
      <HeaderComponent
        title={notifications}
        showBack={true}
        rightIcon={false}
        IconColor={GlobalStyles.blackcolor.color}
        titleStyle={[GlobalStyles.headertitle, GlobalStyles.blackcolor]}
        containerStyle={[
          GlobalStyles.Full_widthLine,
          {
            paddingBottom: GlobalStyles.margin_top10.marginTop,
            paddingTop: 10,
          },
        ]}
      />
      {/* Custom tab bar */}
      <CustomTabView
        routes={NotificationTabs}
        initialIndex={index}
        onIndexChange={setIndex}
        activeColor={Colors.primaryColor}
        inactiveColor={Colors.color_E5E7EB}
        indicatorColor={Colors.primaryColor}
        backgroundColor={Colors.white}
      />
      <View style={[GlobalStyles.viewLine, mt(-12)]} />

      <FlatList
        data={NotificationData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </BlueWhiteBackground>
  );
};

export default React.memo(Notifications);
