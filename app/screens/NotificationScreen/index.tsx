import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import CustomTabView from "../../components/atoms/Tabs";
import { Colors } from "../../styles";
import { const_RESET_STORE, notifications } from "../../types/constants";
import GlobalStyles from "../../styles/GlobalStyles";
import { mt } from "../../utils/spaces";
import { capitalizeFirstLetter, NotificationTabs } from "../../types/strings";
import NotificationItems from "../../components/atoms/Notificationtems";
import HeaderComponent from "../../components/atoms/HeaderComponent";
import BlueWhiteBackground from "../../components/atoms/DashBoardBG";
import colors from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { NotificationRequest } from "./notificationSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const Notifications = () => {
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 10;

  const dispatch = useDispatch();
  const { notificationData, loading } = useSelector(
    (state: RootState) => state.notification
  );

  const isFirstRender = useRef(true);
  const type = NotificationTabs[index]?.key.toUpperCase(); // e.g. ALL, PAYMENTS, UPDATES

  // ✅ Fetch notifications from API
  const fetchNotifications = useCallback(
    (resetPage = false) => {
      const newPage = resetPage ? 1 : page;
      console.log("➡️ Fetching notifications:", { page: newPage, type });

      if (resetPage || page == 1) {
        dispatch({ type: const_RESET_STORE });
      }

      dispatch(NotificationRequest({ page: newPage, limit, type }));
    },
    [dispatch, page, type]
  );

  // ✅ Initial + tab/page change effect
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchNotifications(true);
    } else {
      fetchNotifications(true); // always refresh when tab/page changes
    }
  }, [index, page]);

  // ✅ Handle tab change
  const handleTabChange = (i: number) => {
    setIndex(i);
    setPage(1);
    // ⚠️ Removed fetchNotifications() here to prevent double API call
  };

  // ✅ Infinite scroll pagination
  const handleLoadMore = useCallback(() => {
    const notificationsList = notificationData?.data?.notifications || [];
    if (!loading && notificationsList.length >= page * limit) {
      setPage((prev) => prev + 1);
    }
  }, [loading, notificationData, page]);

  // ✅ Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchNotifications(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, [fetchNotifications]);

  // ✅ Render item
  const renderItem = ({ item }: any) => <NotificationItems data={item} />;

  // ✅ Footer loader
  const renderFooter = () =>
    loading && page > 1 ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color={Colors.primaryColor} />
      </View>
    ) : null;

  // ✅ Empty component (only when page === 1)
  const renderEmpty = () => {
    const noData =
      !loading &&
      page === 1 &&
      (!notificationData?.data?.notifications ||
        notificationData?.data?.notifications?.length === 0);

    if (noData) {
      return (
        <View style={{ alignItems: "center", paddingTop: 40 }}>
          <Text style={{ color: Colors.gray, fontSize: 14 }}>
            No notifications available
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
    <BlueWhiteBackground
      headerHeight={70}
      BlueWhiteBackgroundStyle={{ backgroundColor: colors.white }}>
      <HeaderComponent
        title={capitalizeFirstLetter(notifications)}
        showBack
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

      {/* Tabs */}
      <CustomTabView
        routes={NotificationTabs}
        initialIndex={index}
        onIndexChange={handleTabChange}
        activeColor={Colors.primaryColor}
        inactiveColor={Colors.color_E5E7EB}
        indicatorColor={Colors.primaryColor}
        backgroundColor={Colors.white}
      />

      <View style={[GlobalStyles.viewLine, mt(-12)]} />

      {/* FlatList Notifications */}
      <FlatList
        data={notificationData?.data?.notifications || []}
        keyExtractor={(item, idx) => item?.id?.toString() || idx.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primaryColor]}
          />
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
      />
    </BlueWhiteBackground>
    </SafeAreaView>
  );
};

export default React.memo(Notifications);