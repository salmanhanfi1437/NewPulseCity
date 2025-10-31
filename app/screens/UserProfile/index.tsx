import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Images from '../../assets/images';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles from '../../styles/GlobalStyles';
import Image from '../../components/atoms/Image';
import Header from '../../components/atoms/HeaderComponent';
import withBottomWhiteOverlay from '../../components/atoms/Container';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styles';
const { width, height } = Dimensions.get('window');
const UserProfile = () => {
  return (
    <LinearGradient
      colors={Colors.zuvyPrimaryGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 2 }}
      style={GlobalStyles.container}
    >
      <Header
        title={'Profile'}
        showBack={true}
        rightIcon={false}
        titleStyle={GlobalStyles.headertitle}
      />
      <View style={[GlobalStyles.profileContainer, { top: height * 0.14 }]}>
        <View style={[GlobalStyles.imgContainer]}>
          <Image source={Images.profile} style={GlobalStyles.imgContainer} />
        </View>
        <CustomText
          title={config.Profile.name}
          textStyle={[GlobalStyles.headertitle, { flex: 0 }]}
        />
        <CustomText
          title={config.Profile.position}
          textStyle={[
            GlobalStyles.headertitle,
            { fontWeight: '400', fontSize: 14 },
          ]}
        />
      </View>
    </LinearGradient>
  );
};

export default withBottomWhiteOverlay(UserProfile);
