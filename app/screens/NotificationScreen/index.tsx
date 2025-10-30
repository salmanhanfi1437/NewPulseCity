import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CustomTabView, { RouteType } from "../../components/atoms/Tabs";
import { Colors } from "../../styles";
import Header from "../../components/atoms/Header";
import HeaderWithBackButton from "../../components/atoms/HeaderWithBackButton";
import { notifications } from "../../types/constants";
import GlobalStyles from "../../styles/GlobalStyles";
import { bgColor, mt } from "../../utils/spaces";
import { NotificationData, NotificationTabs } from "../../types/strings"; // 👈 imported reusable routes
import NotificationItems from '../../components/atoms/Notificationtems/index'

const Notifications = () => {
  

  const [index, setIndex] = useState(0);


const renderItem = ({item}) => {
    return(
       <NotificationItems data={item}/>
    )
}

  return (
    <Header style={[bgColor(Colors.white),GlobalStyles.flexOne]}>
        <HeaderWithBackButton title={notifications}/>
      {/* Custom tab bar */}
      <View style={[GlobalStyles.viewLine]}/>
      <CustomTabView
        routes={NotificationTabs}
        initialIndex={index}
        onIndexChange={setIndex}
        activeColor={Colors.primaryColor}
        inactiveColor={Colors.color_E5E7EB}
        indicatorColor={Colors.primaryColor}
        backgroundColor={Colors.white}
      />
            <View style={[GlobalStyles.viewLine,mt(-12)]}/>

    
       <FlatList
        data={NotificationData}
        keyExtractor = {(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </Header>
  );
};


export default React.memo(Notifications);