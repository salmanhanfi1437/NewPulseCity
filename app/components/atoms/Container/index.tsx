import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import { Colors } from '../../../styles';
import CardContainer from '../CardContainer';
import { CustomText } from '../Text';
import config from '../../../screens/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../styles/colors';
import {
  ContactSVG,
  BagSVG,
  LocationSVG,
  PhoneSVG,
  Globe,
  Shield,
  Bell,
} from '../../../assets/svg';
import { ms } from 'react-native-size-matters';

const withBottomWhiteOverlay = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { hideTopContent = false, hideBottomContent = false } = props;
    // --- Data Arrays ---
    const personalInfo = [
      {
        icon: ContactSVG,
        label: config.Profile.fullname,
        value: 'Anjali Singh',
      },
      { icon: BagSVG, label: config.Profile.role, value: 'Distributor' },
      { icon: LocationSVG, label: config.Profile.Zone, value: 'Delhi' },
      {
        icon: PhoneSVG,
        label: config.Profile.contact,
        value: '+91-7776006787',
      },
      { icon: PhoneSVG, label: config.Profile.Details, value: 'Shipping' },
    ];

    const settings = [
      { icon: Globe, label: config.Profile.lang, value: 'English' },
      { icon: Bell, label: config.Profile.noti, value: 'Enabled' },
      { icon: Shield, label: config.Profile.privaSecurity, value: 'Standard' },
    ];

    // --- Reusable Components ---
    const InfoItem = ({ Icon, label, value }: any) => (
      <View
        style={[
          GlobalStyles.row,
          GlobalStyles.containerPaddings,
          GlobalStyles.avoidJustify,
        ]}
      >
        <Icon width={ms(40)} height={ms(40)} />
        <View style={GlobalStyles.textConatiner}>
          <CustomText title={label} textStyle={GlobalStyles.faintText} />
          <CustomText title={value} />
        </View>
      </View>
    );

    const SettingItem = ({ Icon, label, value }: any) => (
      <TouchableOpacity
        style={[
          GlobalStyles.row,
          GlobalStyles.avoidJustify,
          // { marginVertical: -10 },
        ]}
      >
        <Icon width={ms(40)} height={ms(40)} />
        <View style={GlobalStyles.textConatiner}>
          <CustomText title={label} textStyle={GlobalStyles.faintText} />
          <CustomText title={value} />
        </View>
      </TouchableOpacity>
    );

    // --- UI ---
    return (
      <View style={styles.container}>
        {!hideTopContent && ( // 👈 conditionally render top section
          <>
            <View style={[GlobalStyles.whiteHalf, GlobalStyles.whiteOverlay]} />
            <View style={GlobalStyles.topContent}>
              <WrappedComponent {...props} />
            </View>
          </>
        )}

        {!hideBottomContent && (
          <View style={GlobalStyles.scrollArea}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={GlobalStyles.scrolIndexStyle}
            >
              {/* Personal Info Card */}
              <CardContainer style={GlobalStyles.borderStyles}>
                <View style={GlobalStyles.row}>
                  <CustomText
                    title={config.Profile.PersonalInfoTitle}
                    textStyle={GlobalStyles.cardTiltle}
                  />
                  <TouchableOpacity
                    style={[GlobalStyles.row, { flex: 0, width: 45 }]}
                  >
                    <FontAwesome5
                      name="pen"
                      size={12}
                      color={colors.primaryColor}
                    />
                    <CustomText
                      title={config.Profile.edit}
                      textStyle={[
                        GlobalStyles.faintText,
                        { color: Colors.primaryColor },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                {personalInfo.map((item, index) => (
                  <InfoItem
                    key={index}
                    Icon={item.icon}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </CardContainer>

              {/* Settings Card */}
              <CustomText
                title={config.Profile.setting}
                textStyle={[GlobalStyles.cardTiltle, { left: 20 }]}
              />
              {settings.map((item, index) => (
                <CardContainer style={GlobalStyles.borderStyles}>
                  <SettingItem
                    key={index}
                    Icon={item.icon}
                    label={item.label}
                    value={item.value}
                  />
                </CardContainer>
              ))}
              <TouchableOpacity>
                <CardContainer style={GlobalStyles.logoutBorderStyles}>
                  <FontAwesome5
                    name="sign-out-alt"
                    size={25}
                    color={Colors.red}
                    style={{ alignSelf: 'center' }}
                  />
                  <CustomText
                    title={config.Profile.logout}
                    textStyle={[GlobalStyles.cardTiltle, { color: Colors.red }]}
                  />
                </CardContainer>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.primaryColor,
  },
});

export default withBottomWhiteOverlay;
