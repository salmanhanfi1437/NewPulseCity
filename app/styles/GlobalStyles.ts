import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';
import { Colors, Typography } from '.';
import { ms, mvs } from 'react-native-size-matters';
import colors from './colors';
import ZuvyDashBoard from '../screens/DashBoard';

const { width, height } = Dimensions.get('screen');
const GlobalStyles = StyleSheet.create({
  //greyColor
  greyColorText: {
    color: Colors.grey,
  },
  //whitecolor
  whiteColor: {
    color: Colors.white,
  },
  lightwhite: {
    backgroundColor: Colors.lightWhite,
    color: Colors.lightWhite,
  },
  //blackColor
  blackcolor: {
    color: Colors.black,
  },
  avoidTopMargin: {
    marginTop: 0,
  },
  itemCenterStyle: {
    alignItems: 'center',
    flex: 1,
  },
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
    fontWeight: '700',
    ...Typography.weights.boldU,
  },
  buttonContainer: {
    width: width * ms(0.85),
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: height * ms(0),
  },
  margin_top10: {
    marginTop: mvs(10),
  },
  margin_bottom_10: {
    marginBottom: mvs(10),
  },
  headingText: {
    fontSize: ms(20),
    color: Colors.black,
    fontWeight: '700',
    ...Typography.weights.mediumU,
    marginTop: mvs(30),
  },
  //header
  headercontainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  headertitle: {
    fontSize: ms(18),
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    color: Colors.white,
  },
  iconButton: {
    padding: ms(5),
  },
  placeholder: {
    width: 30,
  },
  whiteHalf: {
    height: height / 1.5,
    width: '100%',
    backgroundColor: '#fff',
  },
  whiteOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    elevation: 0,
  },
  profileContainer: {
    // padding: 10,
    alignSelf: 'center',
    top: height * 0.12,
    alignItems: 'center',
  },
  imgContainer: {
    height: ms(80),
    width: ms(80),
    borderRadius: 50,
    backgroundColor: Colors.white,
  },
  shadowStyles: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    padding: 16,
  },
  scrolIndexStyle: {},
  containerPaddings: {
    marginVertical: 10,
  },
  faintText: {
    color: Colors.semiLight_grey,
    fontSize: ms(12),
  },
  textConatiner: {
    left: 10,
  },
  avoidJustify: { justifyContent: 'flex-start' },
  scrollArea: {
    flex: 0.7,
    backgroundColor: 'transparent',
    zIndex: 3,
  },
  cardTiltle: {
    fontSize: ms(16),
    fontWeight: '500',
    flex: 1,
    color: Colors.black,
  },
  topContent: {
    flex: 0.4,
    zIndex: 2,
  },
  borderStyles: {
    borderWidth: 1,
    borderColor: Colors.semiLight_grey,
  },
  //DashBoard Header
  logoutBorderStyles: {
    borderWidth: 0.7,
    borderColor: Colors.light_red,
    backgroundColor: Colors.semilight_red,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center', // Horizontally center items
  },
  zuvyHeaderContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    paddingVertical: mvs(15),
    paddingHorizontal: ms(16),
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
  },
  zuvyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  zuvyRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zuvyIconBox: {
    backgroundColor: '#F6F6F6',
    padding: ms(6),
    borderRadius: ms(10),
    marginRight: ms(8),
  },
  zuvyProfileImg: {
    width: ms(35),
    height: ms(35),
    borderRadius: ms(20),
  },
  //DashBoard Styles
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
  },
  translusantContainer: {
    justifyContent: 'center',
    padding: ms(20),
    marginVertical: ms(20),
  },
  ZuvyDashBoardCard: {
    marginTop: -height * 0.03,
    width: '90%',
  },
  ZuvyDashBoardScrollContent: {
    paddingBottom: ms(40),
    alignSelf: 'center',
  },
  ZuvyDashBoardBtn: {
    backgroundColor: colors.primaryColor2,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  ZuvyDashBoardBtnText: {
    fontSize: ms(14),
    paddingLeft: 8,
    paddingRight: 8,
    fontWeight: '400',
  },
  ZuvyDashBoardRowContainer: {
    width: width - 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ZuvyDashBoardContainer: {
    width: width - 40,
    alignSelf: 'center',
  },

  //Play Card Styles
  playCard: {
    width: ms(180),
    borderRadius: ms(12),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // marginHorizontal: ms(8),
  },
  playGradientBox: {
    height: ms(100),
    borderTopLeftRadius: ms(12),
    borderTopRightRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playDurationBadge: {
    position: 'absolute',
    bottom: ms(8),
    right: ms(8),
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: ms(6),
    paddingHorizontal: ms(6),
    paddingVertical: ms(2),
  },
  playDurationText: {
    color: Colors.white,
    fontSize: ms(10),
  },
  playInfoContainer: {
    padding: ms(10),
  },
  playName: {
    fontSize: ms(13),
    fontWeight: '500',
  },
  playRole: {
    fontSize: ms(12),
    color: '#666',
    marginTop: ms(2),
  },
});
export default GlobalStyles;
