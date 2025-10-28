import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, View } from 'react-native';
import Images from '../../assets/images';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles from '../../styles/GlobalStyles';
import Image from '../../components/atoms/Image';
import Header from '../../components/atoms/HeaderComponent';
import withBottomWhiteOverlay from '../../components/atoms/Container';
import CardContainer from '../../components/atoms/CardContainer';

const UserProfile = () => {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Header
        title={'Profile'}
        showBack={true}
        rightIcon={true}
        titleStyle={GlobalStyles.headertitle}
      />
      <View style={GlobalStyles.profileContainer}>
        <View style={[GlobalStyles.imgContainer]}>
          <Image source={Images.profile} style={GlobalStyles.imgContainer} />
        </View>
        <CustomText
          title={config.Profile.name}
          textStyle={[GlobalStyles.headertitle,{ flex:0}]}
        />
        <CustomText
          title={config.Profile.position}
          textStyle={[
            GlobalStyles.headertitle,
            { fontWeight: '400', fontSize: 14 },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default withBottomWhiteOverlay(UserProfile);
