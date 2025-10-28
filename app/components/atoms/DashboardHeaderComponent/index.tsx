import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // for bell icon
import { ZuvyLogoSVG } from '../../../assets/svg';

const ZuvyHeader = () => {
  return (
    <View style={styles.container}>
      {/* Top Row: Logo, Bell, Profile */}
      <View style={styles.topRow}>
        <ZuvyLogoSVG />
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconBox}>
            <Icon name="bell" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://randomuser.me/api/portraits/women/44.jpg',
              }}
              style={styles.profileImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ZuvyHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0066FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 30,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: '#F6F6F6',
    padding: 6,
    borderRadius: 10,
    marginRight: 8,
  },
  profileImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  textSection: {
    marginTop: 15,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  subText: {
    color: '#E6E6E6',
    fontSize: 13,
    marginTop: 4,
  },
  infoText: {
    color: '#E6E6E6',
    fontSize: 13,
    marginTop: 6,
  },
  bold: {
    color: '#fff',
    fontWeight: '600',
  },
});
