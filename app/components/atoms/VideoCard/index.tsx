import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ms } from 'react-native-size-matters';
import { PlaySVG } from '../../../assets/svg';
import GlobalStyles from '../../../styles/GlobalStyles';

type DistributorCardProps = {
  name: string;
  role: string;
  duration?: string;
  gradientColors?: string[];
  onPress?: () => void;
};

const VideoCard: React.FC<DistributorCardProps> = ({
  name,
  role,
  duration = '0:30',
  gradientColors = ['#E86FC5', '#FE9A9A'],
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={GlobalStyles.playCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={GlobalStyles.playGradientBox}
      >
        <View style={GlobalStyles.playContainer}>
          <PlaySVG width={ms(24)} height={ms(24)} />
        </View>
        <View style={GlobalStyles.playDurationBadge}>
          <Text style={GlobalStyles.playDurationText}>{duration}</Text>
        </View>
      </LinearGradient>

      <View style={GlobalStyles.playInfoContainer}>
        <Text style={GlobalStyles.playName}>{name}</Text>
        <Text style={GlobalStyles.playRole}>{role}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;
