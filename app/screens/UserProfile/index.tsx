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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { ProfileRequest } from './profileSlice';
import { showAlert } from '../../components/atoms/AlertBox/showAlert';
const { width, height } = Dimensions.get('screen');

const UserProfile = () => {

  const { profileData, error } = useSelector( (state: RootState) => state.profile);

      const dispatch = useDispatch();


  useEffect(() =>{

    if(profileData || error)
    {
        if(profileData.success)
        {

        }else{
          showAlert(error?.message)
        }
    }
   },[profileData,error])
  

   useEffect(() =>{
    dispatch(ProfileRequest())
   },[])

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
      <View style={[GlobalStyles.profileContainer, { top: height * 0.08 }]}>
        <View style={[GlobalStyles.imgContainer]}>
          <Image source={Images.profile} style={GlobalStyles.imgContainer} />
        </View>
        <CustomText
          title={profileData?.data?.name}
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
