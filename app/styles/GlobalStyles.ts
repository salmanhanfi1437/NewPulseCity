import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Typography } from '.';
import { ms, mvs } from 'react-native-size-matters';

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
    width: ms(160),
    height: ms(260),
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
    fontSize: ms(24),
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    paddingHorizontal: ms(35),
  },
  title: {
    fontSize: ms(28),
    color: Colors.white,
    textAlign: 'left',
  },
  text: {
    fontSize: ms(14),
    color: Colors.white,
  },
  imagePlaceholder: {
    width: ms(250),
    height: ms(250),
    borderRadius: ms(125),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ms(40),
  },
  imageText: {
    color: Colors.white,
    fontSize: ms(14),
    fontStyle: 'italic',
  },
  buttonCircle: {
    width: ms(60),
    height: ms(40),
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: ms(20),
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
    height: ms(2),
    borderRadius: ms(4),
    marginHorizontal: ms(3),
  },

  activeDot: {
    backgroundColor: Colors.primaryColor,
    width: ms(60),
  },
  // Style for all inactive dots
  inactiveDot: {
    backgroundColor: Colors.transparent, // Light semi-transparent white
    width: ms(8),
  },
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: height * ms(0.1),
    width: width,
    alignItems: 'center',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: ms(0),
    paddingHorizontal: ms(35),
    bottom: height * ms(0.2),
  },
  slideinnerContainer: {
    position: 'absolute',
    bottom: '30%',
  },
  Custombutton: {
    backgroundColor: Colors.transparent,
    width: width / ms(1.2),
    padding: ms(10),
    borderRadius: ms(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(10),
    height: ms(50),
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: Colors.white,
    fontSize: ms(18),
    fontWeight:'700',
    ...Typography.weights.boldU,
  },
  buttonContainer: {
    width: width * ms(0.85),
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: height * ms(0),
  },
  margin_top10 : {
    marginTop:mvs(10),
  },
  margin_bottom_10:{
    marginBottom:mvs(10),
  },
   headingText: {
        fontSize: ms(20),
        color: Colors.black,
        fontWeight: '700',
        ...Typography.weights.mediumU,
        marginTop: mvs(30),
    },
});
export default GlobalStyles;
