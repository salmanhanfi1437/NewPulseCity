import React, { useEffect } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../components/atoms/Text';
import config from '../config';
import GlobalStyles, {
  getShadowWithElevation,
} from '../../styles/GlobalStyles';
import BlueWhiteBackground from '../../components/atoms/DashBoardBG';
import { Colors } from '../../styles';
import { ZuvyLogo } from '../../assets/svg';
import CustomButton from '../../components/atoms/CustomButton';
import VideoCard from '../../components/atoms/VideoCard';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import HoverButton from '../../components/atoms/HoverButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import { ms } from 'react-native-size-matters';
import { Text } from 'react-native';
import { yourCart } from '../../types/constants';

const PromoScreen = () => {
  const navigation = useNavigation<any>();
  const { fontSize, fontWeight, ...restZuvylogo } = GlobalStyles.Promologo;

  const handleNavigation = () => {
    navigation.replace(yourCart);
  };

  return (
    <BlueWhiteBackground
      LinearView={true}
      headerHeight={0}
      linearLocation={[0, 1, 1]}
      LinearViewStyles={[GlobalStyles.fullScreenContent]}
    >
      {/* <ZuvyLogo  /> */}

      <ZuvyLogo
        height={ms(80)}
        width={ms(150)}
        style={[restZuvylogo]}
        preserveAspectRatio="xMidYMid meet"
        viewBox="65 0 100 100"
      />
      <View style={GlobalStyles.videoWrapper}>
        <Video
          source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }} // Replace with your video
          style={GlobalStyles.video}
          resizeMode="cover"
          repeat
          muted={true}
        />

        {/* Skip Button (on top of video) */}

        <TouchableOpacity
          style={[GlobalStyles.skipButton]}
          onPress={handleNavigation}
        >
          <View style={[GlobalStyles.row]}>
            <Text style={[GlobalStyles.faintText, { color: Colors.white }]}>
              {config.PromoScree.skipButton}
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={18}
              color={colors.white}
              style={{ left: 5 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </BlueWhiteBackground>
  );
};

export default PromoScreen;
