import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  GestureResponderEvent,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles from '../../styles/GlobalStyles';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import CardContainer from '../../components/atoms/CardContainer';
import { Colors } from '../../styles';
import CustomTextInput from '../../components/atoms/TextInput';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import Header from '../../components/atoms/HeaderComponent';
import Badge from '../../components/atoms/Badge';
import ViewOutlined from '../../components/atoms/ViewOutlined';
import Dropdown from '../../components/atoms/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');
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

const QRManageMent = () => {
  const navigation = useNavigation<any>();
  const { color, flex, textAlign, ...rest } = GlobalStyles.headertitle;
  const { borderRadius, padding, ...restShadow } = GlobalStyles.shadowStyles;
  const getDynamicTextStyle = (
    size?: number,
    color?: string,
    marginVertical?: number,
    margin?: number,
  ) => ({
    fontSize: size,
    color,
    marginVertical,
    margin,
  });
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
        return Colors.green;
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
        return Colors.semiLight_grey;
    }
  };

  const [activeFilter, setactiveFilter] = useState(
    config.ZuvyQrManagement.qrfilter[0],
  );
  return (
    <BlueWhiteBackground
      headerHeight={100}
      BlueWhiteBackgroundStyle={GlobalStyles.lightwhite}
    >
      <Header
        title={config.ZuvyQrManagement.H1}
        showBack={true}
        rightIcon={false}
        IconColor={GlobalStyles.blackcolor.color}
        titleStyle={[GlobalStyles.headertitle, GlobalStyles.blackcolor]}
        containerStyle={[
          GlobalStyles.Full_widthLine,
          { paddingBottom: GlobalStyles.margin_top10.marginTop },
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
                textStyle={[GlobalStyles.greyColorText]}
              />
            </View>
            <CustomText
              title={'1,247'}
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
                textStyle={[GlobalStyles.greyColorText]}
              />
            </View>
            <CustomText
              title={'892'}
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
          style={{ padding: GlobalStyles.zuvyIconBox.padding + 2 }}
        >
          <View style={[GlobalStyles.zuvyHeaderRow]}>
            {config.ZuvyQrManagement.qrfilter.map(item => {
              return (
                <TouchableOpacity
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
                    textStyle={[getDynamicTextStyle(9, colors.grey, 0, 6), {}]}
                    style={[
                      getDynamicViewStyle({
                        backgroundColor: GlobalStyles.whiteColor.color,
                      }),
                      GlobalStyles.alignItem,
                      restShadow,
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
          data={config.dummyQr}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <CardContainer
                style={[
                  GlobalStyles.lightwhite.backgroundColor,
                  GlobalStyles.width50,
                  GlobalStyles.paginationContainer.alignSelf,
                  GlobalStyles.containerPaddings,
                ]}
              >
                <View style={GlobalStyles.row}>
                  <View
                    style={[GlobalStyles.viewRow, GlobalStyles.itemCenterStyle]}
                  >
                    <MaterialIcons
                      name="qr-code"
                      size={30}
                      color={Colors.primaryColor2}
                    />
                    <View style={[getDynamicViewStyle({ left: 20 })]}>
                      <CustomText title={item.id} />
                      <CustomText title={item.createdDate} />
                    </View>
                  </View>
                  <Badge
                    text={item.status}
                    backgroundColor={getStatusColor(item.status)}
                    textcolor={getStatusTextColor(item.status)}
                    padding={8}
                  />
                </View>
                <View style={GlobalStyles.row}>
                  <View style={GlobalStyles.halfwidth}>
                    <CustomText
                      title={'Sub-agent'}
                      textStyle={[GlobalStyles.greyColorText]}
                    />
                  </View>
                  <View style={GlobalStyles.halfwidth}>
                    <CustomText
                      title={'Plan'}
                      textStyle={[GlobalStyles.greyColorText]}
                    />
                  </View>
                </View>
                <View style={GlobalStyles.row}>
                  <View style={GlobalStyles.halfwidth}>
                    <CustomText title={item.merchant} />
                  </View>
                  <View style={GlobalStyles.halfwidth}>
                    <CustomText title={item.plan} />
                  </View>
                </View>
                <View style={GlobalStyles.row}>
                  <View style={GlobalStyles.halfwidth}>
                    <CustomText
                      title={'Retired Date'}
                      textStyle={[GlobalStyles.greyColorText]}
                    />
                  </View>
                  <View style={GlobalStyles.halfwidth}>
                    <CustomText title={'Reason'} />
                  </View>
                </View>
                <View style={GlobalStyles.row}>
                  <View style={GlobalStyles.halfwidth}>
                    <CustomText title={item.lastPayment} />
                  </View>
                  <View style={GlobalStyles.halfwidth}>
                    <CustomText title={item.reason} />
                  </View>
                </View>
                <View style={GlobalStyles.viewLine} />
                <View style={GlobalStyles.row}>
                  {item.actions.map(item => (
                    <>
                      <CustomText title={item} />
                    </>
                  ))}
                  <MaterialIcons
                    name="chevron-right"
                    size={32}
                    color={Colors.grey_50}
                  />
                </View>
              </CardContainer>
            );
          }}
        />
      </ScrollView>
    </BlueWhiteBackground>
  );
};

export default QRManageMent;
