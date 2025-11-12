import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../../styles/GlobalStyles';
import CardContainer from '../CardContainer';
import { Colors, Typography } from '../../../styles';
import { CustomText } from '../Text';
import config from '../../../screens/config';
import Dropdown from '../CustomModal';
import ViewOutlined from '../ViewOutlined';
import CustomTextInput from '../TextInput';
import getDynamicTextStyle from '../../../styles/DynamicTextStyles';
import { bgColor, pb, pl, pr, pt } from '../../../utils/spaces';
import { showToast } from '../ToastMessage';

interface QrHeaderProps {
  colors: any;
  //   rest: any;
  InventoryData: any;
  activeFilter: string;
  setactiveFilter?: (item: string) => void;
  search: string;
  handleSearch: (text: string) => void;
}
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

const QrHeader: React.FC<QrHeaderProps> = ({
  colors,
  //   rest,
  InventoryData,
  activeFilter,
  setactiveFilter,
  search,
  handleSearch,
}) => {
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

  const { borderRadius, padding, elevation, ...restShadow } =
    GlobalStyles.shadowStyles;
  const { color, flex, textAlign, ...rest } = GlobalStyles.headertitle;

  console.log('----- cehck inavailableQuantity -->', InventoryData?.data);

  const showToast = (msg: string) => {
    console.log('press ->');

    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
    } else {
      Alert.alert('', msg);
    }
  };

  return (
    <View style={[GlobalStyles.ZuvyDashBoardContainer]}>
      {/* Total and Active Cards */}
      <View style={[GlobalStyles.ZuvyDashBoardRowContainer]}>
        {/* Total QRs */}
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
                color: colors.black,
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

        {/* Active QRs */}
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
            title={InventoryData?.data?.usedQuantity}
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

      {/* Filters */}
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
                key={index}
                disabled={!isClickable}
                // onPress={() => setactiveFilter(item)}
                onPress={() => showToast('Coming Soon 🚀')}
                style={[
                  {
                    backgroundColor:
                      activeFilter === item ? Colors.qrbg1 : colors.white,
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
                        activeFilter === item
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

      {/* Filter Buttons */}
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
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showToast('Coming Soon 🚀')}>
              <Dropdown
                disabled={true}
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
                onSelect={() => {}}
                icon={
                  <MaterialIcons
                    name={item.icon}
                    size={12}
                    color={Colors.black}
                  />
                }
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Search Bar */}
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
          style={{
            paddingLeft: GlobalStyles.playInfoContainer.padding,
          }}
        />
        <CustomTextInput
          placeholder={'Search QR codes...'}
          value={search}
          onChangeText={handleSearch}
          style={[GlobalStyles.width70]}
        />
      </ViewOutlined>
    </View>
  );
};

export default QrHeader;
