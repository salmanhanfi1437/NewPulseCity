import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Typography } from '.';
import { ms, mvs } from 'react-native-size-matters';
import typography from './typography';

const { width, height } = Dimensions.get('window');
const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  logo: {
    width: 160,
    height: 260,
  },
  mobileText: {
    fontSize: ms(18),
    color: Colors.white,
    marginTop: mvs(-25),
    fontFamily: 'Poppins-Bold',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 28,
    color: Colors.white,
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    color: Colors.white,
  },
  imagePlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  imageText: {
    color: Colors.white,
    fontSize: 14,
    fontStyle: 'italic',
  },
  buttonCircle: {
    width: 60,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, .3)',
  },
  activeDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, .9)',
  },
  dot: {
    height: 2,
    borderRadius: 4,
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: Colors.primaryColor,
    width: 60,
  },
  // Style for all inactive dots
  inactiveDot: {
    backgroundColor: Colors.transparent, // Light semi-transparent white
    width: 8,
  },
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: height * 0.1,
    width: width,
    alignItems: 'center',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    paddingHorizontal: 35,
    bottom: height * 0.2,
  },
  slideinnerContainer: {
    position: 'absolute',
    bottom: '30%',
  },
  Custombutton: {
    backgroundColor: Colors.transparent,
    width: width / 1.2,
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 50,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    ...Typography.weights.boldU,
  },
  buttonContainer: {
    width: width * 0.85,
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: height * 0,
  },
});
export default GlobalStyles;
