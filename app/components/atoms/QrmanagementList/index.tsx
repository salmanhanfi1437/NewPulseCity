import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { resetEditQr } from '../../../screens/QrEditDetails/EditQrSlice';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../../styles/GlobalStyles';
import { bgColor } from '../../../utils/spaces';
import CardContainer from '../CardContainer';
import { CustomText } from '../Text';
import { Colors, Typography, } from '../../../styles';
import Badge from '../Badge';
import colors from '../../../styles/colors';

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

const QrItemCard = ({ item }: any) => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

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


  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => {
        dispatch(resetEditQr());
        navigation.navigate('EditQRDetails', { data: item });
      }}
    >
      <CardContainer
        style={[
          GlobalStyles.width50,
          GlobalStyles.paginationContainer.alignSelf,
          GlobalStyles.containerPaddings,
          getShadowWithElevation(1),
          bgColor(GlobalStyles.lightwhite.backgroundColor),
        ]}
      >
        <View style={GlobalStyles.row}>
          <View style={[GlobalStyles.viewRow, GlobalStyles.itemCenterStyle]}>
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
                  Typography.size.dynamic(10, 'regular', colors.textColorGrey),
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

        <View style={[GlobalStyles.row, { paddingTop: 10, paddingBottom: 5 }]}>
          <View style={GlobalStyles.halfwidth}>
            <CustomText
              title={'Kit Name'}
              textStyle={[
                Typography.size.dynamic(12, 'regular', colors.textColorGrey),
              ]}
            />
          </View>
        </View>

        <View style={[GlobalStyles.row, { paddingTop: 1, paddingBottom: 2 }]}>
          <View style={GlobalStyles.halfwidth}>
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

        <View style={[GlobalStyles.row, { paddingTop: 5 }]}>
          <View style={GlobalStyles.halfwidth}>
            <CustomText
              title={'Agent'}
              textStyle={[
                Typography.size.dynamic(11, 'regular', colors.textColorGrey),
              ]}
            />
          </View>
          <View style={GlobalStyles.halfwidth}>
            <CustomText
              title={'Plan'}
              textStyle={[
                Typography.size.dynamic(11, 'regular', colors.textColorGrey),
              ]}
            />
          </View>
        </View>

        <View style={[GlobalStyles.row, { paddingTop: 5, paddingBottom: 5 }]}>
          <View style={GlobalStyles.halfwidth}>
            <CustomText
              title={item.qrStatus == 'NOT_ASSIGNED' && 'Not Assigned'}
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

        <View style={[GlobalStyles.viewLine, GlobalStyles.containerPaddings]} />
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
};

export default QrItemCard;
