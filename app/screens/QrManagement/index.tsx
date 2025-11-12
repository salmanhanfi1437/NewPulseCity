import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../styles/GlobalStyles';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import CardContainer from '../../components/atoms/CardContainer';
import { Colors, Typography } from '../../styles';
import CustomTextInput from '../../components/atoms/TextInput';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import Header from '../../components/atoms/HeaderComponent';
import Badge from '../../components/atoms/Badge';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import Dropdown from '../../components/atoms/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import getDynamicTextStyle from '../../styles/DynamicTextStyles';
import HoverButton from '../../components/atoms/HoverButton';
import { bgColor, pb, pl, pr, pt } from '../../utils/spaces';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventoryRequest, fetchViewQRRequest } from './QrmanagementSlice';
import { resetEditQr } from '../QrEditDetails/EditQrSlice';
import EventBus from 'react-native-event-bus';
import QrItemCard from '../../components/atoms/QrmanagementList';
import QrHeader from '../../components/atoms/QrmanagementHeader';
interface DynamicViewStyleProps {
  marginVertical?: number;
  justifyContent?: ViewStyle['justifyContent'];
  alignSelf?: ViewStyle['alignSelf'];
  alignContent?: ViewStyle['alignContent'];
  margin?: number;
  height?: number;
  backgroundColor?: string;
  width?: number;
  left?: number;
}

const QRManageMent = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { color, flex, textAlign, ...rest } = GlobalStyles.headertitle;

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const isFirstRender = useRef(true);
  const { borderRadius, padding, elevation, ...restShadow } =
    GlobalStyles.shadowStyles;
  const { error: dashboardError, dashboardData } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const { InventoryError, InventoryData } = useSelector(
    (state: RootState) => state.fetchInventory,
  );
  const [activeFilter, setactiveFilter] = useState(
    config.ZuvyQrManagement.qrfilter[0],
  );

  const { qrData, error, loading } = useSelector(
    (state: RootState) => state.qrManagement,
  );

  const getDynamicViewStyle = ({
    marginVertical,
    justifyContent,
    alignSelf,
    alignContent,
    margin,
    height,
    backgroundColor,
    width,
    left,
  }: DynamicViewStyleProps): ViewStyle => ({
    marginVertical,
    justifyContent,
    alignSelf,
    alignContent,
    margin,
    height,
    backgroundColor,
    width,
    left,
  });

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      // 👇 Refresh only if returning with "refresh: true"
      if (route?.params?.refresh) {
        setPage(1);
        dispatch(fetchViewQRRequest({ page: page, limit, search }));
        route.params.refresh = false;

        // 👇 Reset flag so it doesn’t trigger repeatedly
        if (route?.params) {
          route.params.refresh = false;
        }
      }
    }, [route?.params?.refresh]),
  );

  useEffect(() => {
    // Subscribe to event
    const subscription = EventBus.getInstance().addListener(
      'refreshQR',
      data => {
        console.log('🔁 Refresh triggered!', data);
        dispatch(fetchViewQRRequest({ page, limit, search }));
      },
    );
    EventBus.getInstance().addListener('refreshQR', subscription);
    // Cleanup on unmount
    return () => {
      EventBus.getInstance().removeListener(subscription);
    };
  }, [dispatch]);

  const fetchQrData = useCallback(
    (resetPage = false) => {
      const newPage = resetPage ? 1 : page;
      dispatch(
        fetchViewQRRequest({
          page: newPage,
          limit,
          search: search?.trim() || '',
        }),
      );
    },
    [dispatch, page, limit, search],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchQrData(true);
    } else {
      fetchQrData(false);
    }
  }, [page]);

  const handleLoadMore = useCallback(() => {
    if (loading || isLoadingMore) return;

    const pagination = qrData?.data?.pagination;
    const currentLength = qrData?.data?.dummyQrs?.length || 0;
    const totalItems = pagination?.totalItems || 0;
    const currentPage = pagination?.currentPage || 1;
    const totalPages = pagination?.totalPages || 1;

    // Check if more pages are available
    if (currentPage < totalPages && currentLength < totalItems) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
      setTimeout(() => setIsLoadingMore(false), 500);
    }
  }, [loading, isLoadingMore, qrData]);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      setPage(1);
      dispatch(fetchViewQRRequest({ page: 1, limit, search: search.trim() }));
    }, 2000); // 600ms delay after typing stops

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (qrData) console.log('✅ QR Data:', qrData);
    if (error) console.log('❌ QR Error:', error);
    if (InventoryData) console.log('InventoryData:', InventoryData);
    if (dashboardData) console.log('dashboardData:', InventoryData);
    if (dashboardError) console.log('dashboardError      :', InventoryData);
  }, [qrData, error, InventoryData, dashboardData, dashboardError]);

  useEffect(() => {
    dispatch(fetchInventoryRequest());
  }, [dispatch]);

  const renderItem = ({ item }: any) => <QrItemCard item={item} />;

  return (
    <BlueWhiteBackground
      headerHeight={70}
      BlueWhiteBackgroundStyle={[
        { backgroundColor: GlobalStyles.lightwhite.backgroundColor },
      ]}
    >
      <Header
        title={config.ZuvyQrManagement.H1}
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

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={[GlobalStyles.ZuvyDashBoardContainer]}
        ListHeaderComponent={
          <QrHeader
            colors={Colors}
            InventoryData={InventoryData}
            activeFilter={activeFilter}
            search={search}
            handleSearch={handleSearch}
          />
        }
        data={qrData?.data?.dummyQrs || []}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator
              size="small"
              color={Colors.primaryColor}
              style={GlobalStyles.containerPaddings}
            />
          ) : null
        }
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={GlobalStyles.EmptyContainer}>
            <MaterialIcons name="qr-code-2" size={50} color={Colors.grey} />
            <CustomText
              title="No QR codes available"
              textStyle={[
                Typography.size.dynamic(14, 'medium', Colors.grey),
                { marginTop: 10 },
              ]}
            />
          </View>
        )}
      />

      <HoverButton onPress={() => navigation.navigate('yourCart')} />
    </BlueWhiteBackground>
  );
};

export default QRManageMent;
