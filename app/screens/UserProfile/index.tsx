import React, { useEffect,useRef } from 'react';
import { View, Dimensions } from 'react-native';
import Images from '../../assets/images';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles from '../../styles/GlobalStyles';
import Image from '../../components/atoms/Image';
import Header from '../../components/atoms/HeaderComponent';
import withBottomWhiteOverlay from '../../components/atoms/Container';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { ProfileRequest } from './profileSlice';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';
import colors from '../../styles/colors';
import { Text } from 'react-native-svg';
import FontStyles from '../../styles/FontStyles';
import { bgColor, fS } from '../../utils/spaces';
import { mvs } from 'react-native-size-matters';
const { height } = Dimensions.get('screen');

const UserProfile = () => {

  const { profileData, error } = useSelector( (state: RootState) => state.profile);

      const dispatch = useDispatch();
const hasFetchedProfile = useRef(false);


  useEffect(() =>{

    if(profileData || error)
    {
        if(profileData?.success)
        {

      }else{
          showAlert(error?.message)
        }
    }
   },[profileData,error])
  

   useEffect(() => {
  if (!hasFetchedProfile.current) {
    hasFetchedProfile.current = true;
    dispatch(ProfileRequest());
  }
}, []);

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
        containerStyle={{ paddingTop: GlobalStyles.tabBarStyle.paddingTop }}
      />
      <View style={[GlobalStyles.profileContainer, { top: height * 0.09 }]}>
        <View style={[GlobalStyles.imgContainer,GlobalStyles.viewCenter,bgColor(Colors.secondaryColor)]}>
          <CustomText textStyle={[FontStyles.buttonText,fS(mvs(20))]}  
          title={profileData?.data?.name[0]}></CustomText>
        </View>
        <CustomText
          title={profileData?.data?.name}
          textStyle={[GlobalStyles.headertitle, { flex: 0 }]}
        />
        <CustomText
          title={config.Profile.position}
          textStyle={[
            GlobalStyles.headertitle,
            Typography.size.dynamic(14,'regular',colors.white)
          ]}
        />
      </View>
    </LinearGradient>
  );
};

export default React.memo(withBottomWhiteOverlay(UserProfile));
