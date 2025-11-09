import React, { useCallback, useEffect, useState } from 'react';
import {
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

const QRManageMent = ({ route }) => {
  const navigation = useNavigation<any>();
  const { color, flex, textAlign, ...rest } = GlobalStyles.headertitle;

  const { borderRadius, padding, elevation, ...restShadow } =
    GlobalStyles.shadowStyles;
  const { error: dashboardError, dashboardData } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const { InventoryError, InventoryData } = useSelector(
    (state: RootState) => state.fetchInventory,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Dummy':
        return Colors.borderBottomColor;
      case 'Active':
        return Colors.color_BBF7D0;
      case 'Assigned':
        return Colors.primaryColor2;
      case 'Retired':
        return Colors.light_red;
      default:
        return Colors.semiLight_grey;
    }
  };
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Dummy':
        return Colors.borderColor;
      case 'Active':
        return Colors.semiGreen;
      case 'Assigned':
        return Colors.white;
      case 'Retired':
        return Colors.red;
      default:
        return Colors.black;
    }
  };

  const dispatch = useDispatch();
  const [activeFilter, setactiveFilter] = useState(
    config.ZuvyQrManagement.qrfilter[0],
  );

  const { qrData, error } = useSelector(
    (state: RootState) => state.qrManagement,
  );

  useFocusEffect(
    useCallback(() => {
      // 👇 Refresh only if returning with "refresh: true"
      if (route?.params?.refresh) {
        dispatch(fetchViewQRRequest());

        // 👇 Reset flag so it doesn’t trigger repeatedly
        if (route?.params) {
          route.params.refresh = false;
        }
      }
    }, [route?.params?.refresh])
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  useEffect(() => {
    if (qrData || error) {
      if (qrData) {
        console.log('cehcekc e ---> logom a ==>', qrData);
      } else {
        console.log('MasterQrError ' + error);
      }
    }
  }, [qrData, error]);

 useEffect(() => {
    // Subscribe to event
    const subscription = EventBus.getInstance().addListener(
      'refreshQR',
      (data) => {
        console.log('🔁 Refresh triggered!', data);
        dispatch(fetchViewQRRequest());
      }
    );

    // Cleanup on unmount
    return () => {
      EventBus.getInstance().removeListener(subscription);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchViewQRRequest());
  }, []);

  useEffect(() => {
    if (dashboardData || dashboardError) {
      console.log('DashBoardData ' + JSON.stringify(dashboardData));
    }
  }, [dashboardData, dashboardError]);


  useEffect(() => {
    if (InventoryData || InventoryError) {
      console.log('InventoryData ' + JSON.stringify(InventoryData));
    }
  }, [InventoryData, InventoryError]);



  useEffect(() => {
    dispatch(fetchInventoryRequest());
  }, []);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          (GlobalStyles.ZuvyDashBoardScrollContent,
            GlobalStyles.ZuvyDashBoardContainer)
        }
      >
        <View style={[GlobalStyles.ZuvyDashBoardRowContainer]}>
          <CardContainer
            style={[
              GlobalStyles.semihalfwidth,
              getShadowWithElevation(1),
              { borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius },
            ]}
          >
            <View style={[GlobalStyles.row]}>
              <View
                style={[
                  GlobalStyles.playInfoContainer,
                  {
                    backgroundColor: Colors.qrbg1,
                    borderRadius: GlobalStyles.modalDropdownList.borderRadius,
                  },
                ]}
              >
                <MaterialIcons
                  name="qr-code"
                  size={17}
                  color={Colors.primaryColor2}
                />
              </View>
              <CustomText
                title={config.ZuvyQrManagement.Total}
                textStyle={[
                  Typography.size.dynamic(12, 'regular', colors.fadeTextColor),
                ]}
              />
            </View>
            <CustomText
              title={InventoryData?.data?.totalQuantity}
              textStyle={[
                rest,
                GlobalStyles.margin_top10,
                {
                  left: GlobalStyles.dot.height,
                  marginVertical: GlobalStyles.iconButton.padding,
                },
              ]}
            />
            <CustomText
              title={'+12% this month'}
              textStyle={[getDynamicTextStyle(12, colors.lightgreen)]}
            />
          </CardContainer>
          <CardContainer
            style={[
              GlobalStyles.semihalfwidth,
              getShadowWithElevation(1),
              { borderRadius: GlobalStyles.ZuvyDashBoardBtn.borderRadius },
            ]}
          >
            <View style={[GlobalStyles.row]}>
              <View
                style={[
                  GlobalStyles.playInfoContainer,
                  {
                    backgroundColor: Colors.faintgreenRGB,
                    borderRadius: GlobalStyles.modalDropdownList.borderRadius,
                  },
                ]}
              >
                <MaterialIcons
                  name="check-circle"
                  size={17}
                  color={Colors.lightgreen}
                />
              </View>
              <CustomText
                title={config.ZuvyQrManagement.Active}
                textStyle={[
                  Typography.size.dynamic(12, 'regular', colors.fadeTextColor),
                ]}
              />
            </View>
            <CustomText
              title={InventoryData?.data?.availableQuantity}
              textStyle={[
                rest,
                GlobalStyles.margin_top10,
                {
                  left: GlobalStyles.dot.height,
                  marginVertical: GlobalStyles.iconButton.padding,
                },
              ]}
            />
            <CustomText
              title={'+8% this month'}
              textStyle={[getDynamicTextStyle(12, colors.lightgreen)]}
            />
          </CardContainer>
        </View>
        <CardContainer
          style={[
            getShadowWithElevation(1),
            { padding: GlobalStyles.zuvyIconBox.padding + 2 },
          ]}
        >
          <View style={[GlobalStyles.zuvyHeaderRow]}>
            {config.ZuvyQrManagement.qrfilter.map((item, index) => {
              const isClickable = index === 0;
              return (
                <TouchableOpacity
                  disabled={!isClickable}
                  onPress={() => {
                    setactiveFilter(item);
                  }}
                  style={[
                    {
                      backgroundColor:
                        activeFilter == item ? Colors.qrbg1 : colors.white,
                      borderRadius: GlobalStyles.zuvyIconBox.padding,
                    },
                  ]}
                >
                  <CustomText
                    title={item}
                    textStyle={[
                      getDynamicTextStyle(12),
                      {
                        padding: GlobalStyles.zuvyIconBox.padding,
                        color:
                          activeFilter == item
                            ? colors.primaryColor2
                            : colors.grey,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </CardContainer>
        <View
          style={[
            GlobalStyles.zuvyHeaderRow,
            { alignSelf: GlobalStyles.profileContainer.alignSelf },
          ]}
        >
          <FlatList
            data={config.ZuvyQrManagement.FilterButtons}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <>
                  <Dropdown
                    data={[]}
                    selectedValue={item.label}
                    textStyle={[Typography.size.dynamic(10), pr(5), pl(5)]}
                    style={[
                      getDynamicViewStyle({
                        backgroundColor: GlobalStyles.whiteColor.color,
                      }),
                      GlobalStyles.alignItem,
                      restShadow,
                      getShadowWithElevation(1),
                      { margin: 5 },
                    ]}
                    onSelect={() => { }}
                    icon={
                      <MaterialIcons
                        name={item.icon}
                        size={12}
                        color={Colors.black}
                      />
                    }
                  />
                </>
              );
            }}
          />
        </View>

        <ViewOutlined
          viewStyle={[
            restShadow,
            GlobalStyles.containerPaddings,
            GlobalStyles.qrInputfield,
            GlobalStyles.zuvyRightIcons,
          ]}
        >
          <MaterialIcons
            name="search"
            size={30}
            color={colors.grey}
            style={{ paddingLeft: GlobalStyles.playInfoContainer.padding }}
          />
          <CustomTextInput placeholder={'Search QR codes...'} value={''} />
        </ViewOutlined>
        <FlatList
          data={qrData?.data?.dummyQrs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => {
                  dispatch(resetEditQr())
                  navigation.navigate('EditQRDetails', { data: item });
                }}
              >
                <CardContainer
                  style={[
                    // GlobalStyles.lightwhite.backgroundColor,
                    GlobalStyles.width50,
                    GlobalStyles.paginationContainer.alignSelf,
                    GlobalStyles.containerPaddings,
                    getShadowWithElevation(1),
                    bgColor(GlobalStyles.lightwhite.backgroundColor),
                  ]}
                >
                  <View style={GlobalStyles.row}>
                    <View
                      style={[
                        GlobalStyles.viewRow,
                        GlobalStyles.itemCenterStyle,
                      ]}
                    >
                      <MaterialIcons
                        name="qr-code"
                        size={30}
                        color={Colors.primaryColor2}
                      />
                      <View style={[getDynamicViewStyle({ left: 20 })]}>
                        <CustomText
                          title={item.qrCode}
                          textStyle={[Typography.size.dynamic(12, 'medium')]}
                        />
                        <CustomText
                          title={'Created : ' + formatDate(item.createdAt)}
                          textStyle={[
                            Typography.size.dynamic(
                              10,
                              'regular',
                              colors.textColorGrey,
                            ),
                          ]}
                        />
                      </View>
                    </View>
                    <Badge
                      text={'Dummy'}
                      backgroundColor={getStatusColor(item.qrStatus)}
                      textcolor={getStatusTextColor(item.qrStatus)}
                      padding={8}
                    />
                  </View>
                  <View style={[GlobalStyles.row, pt(10), pb(5)]}>
                    <View style={GlobalStyles.halfwidth}>
                      <CustomText
                        title={'Kit Name'}
                        textStyle={[
                          Typography.size.dynamic(
                            12,
                            'regular',
                            colors.textColorGrey,
                          ),
                        ]}
                      />
                    </View>
                    {/* <View style={GlobalStyles.halfwidth}>
                      <CustomText
                        title={'Plan'}
                        textStyle={[
                          Typography.size.dynamic(
                            12,
                            'regular',
                            colors.textColorGrey,
                          ),
                        ]}
                      />
                    </View> */}
                  </View>
                  <View style={[GlobalStyles.row, pt(1), pb(2)]}>
                    <View style={[GlobalStyles.halfwidth]}>
                      <CustomText
                        title={item.qrName}
                        textStyle={[Typography.size.dynamic(12, 'medium')]}
                      />
                    </View>
                    <View style={GlobalStyles.halfwidth}>
                      <CustomText
                        title={item.plan}
                        textStyle={[Typography.size.dynamic(12, 'medium')]}
                      />
                    </View>
                  </View>
                  <View style={[GlobalStyles.row, pt(5)]}>
                    <View style={GlobalStyles.halfwidth}>
                      <CustomText
                        title={'Agent'}
                        textStyle={[
                          Typography.size.dynamic(
                            11,
                            'regular',
                            colors.textColorGrey,
                          ),
                        ]}
                      />
                    </View>
                    <View style={GlobalStyles.halfwidth}>
                      <CustomText
                        title={'Plan'}
                        textStyle={[
                          Typography.size.dynamic(
                            11,
                            'regular',
                            colors.textColorGrey,
                          ),
                        ]}
                      />
                    </View>
                  </View>
                  <View style={[GlobalStyles.row, pt(5), pb(5)]}>
                    <View style={GlobalStyles.halfwidth}>
                      <CustomText
                        title={
                          item.qrStatus == 'NOT_ASSIGNED' && 'Not Assigned'
                        }
                        textStyle={[Typography.size.dynamic(12, 'medium')]}
                      />
                    </View>
                    <View style={GlobalStyles.halfwidth}>
                      <CustomText
                        title={'--'}
                        textStyle={[Typography.size.dynamic(12, 'medium')]}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      GlobalStyles.viewLine,
                      GlobalStyles.containerPaddings,
                    ]}
                  />
                  <View style={GlobalStyles.row}>
                    <CustomText
                      title={item.qrStatus == 'NOT_ASSIGNED' && 'Assign'}
                      textStyle={{ color: colors.primaryColor }}
                    />
                    <MaterialIcons
                      name="chevron-right"
                      size={32}
                      color={Colors.grey_50}
                    />
                  </View>
                </CardContainer>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}
            >
              <MaterialIcons
                name="qr-code-2"
                size={50}
                color={Colors.grey}
              />
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
      </ScrollView>
      <HoverButton onPress={() => navigation.navigate('yourCart')} />
    </BlueWhiteBackground>
  );
};

export default QRManageMent;
