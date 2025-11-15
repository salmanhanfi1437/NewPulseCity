import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';
import { Colors, Typography } from '.';
import { ms, mvs } from 'react-native-size-matters';
import colors from './colors';

const { width, height } = Dimensions.get('screen');
const GlobalStyles = StyleSheet.create({
  //halfScreen2.5 width
  authBtn: {
    backgroundColor: Colors.secondaryColor,
  },
  halfwidth: {
    width: width / 2.5,
  },
  semihalfwidth: {
    width: width / 2.3,
  },
  width50: {
    width: width - 50,
  },
  width70: {
    width: width / 1.5,
  },
  fadeText: {
    color: colors.fadeTextColor,
  },
  //greyColor
  greyColorText: {
    color: Colors.grey,
  },
  //whitecolor
  whiteColor: {
    color: Colors.white,
  },
  lightwhite: {
    backgroundColor: Colors.white,
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
  main: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  zuvyRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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

  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsText: {
    fontSize: ms(10),
    ...Typography.weights.normalU,
    textAlign: 'center',
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    paddingHorizontal: ms(35),
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
  mobileText: { fontSize: ms(18), color: Colors.white, marginTop: mvs(-25) },
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
    backgroundColor: Colors.secondaryColor,
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
    bottom: height * ms(0.04),
    width: width,
    alignItems: 'center',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: ms(0),
    paddingHorizontal: ms(35),
    bottom: height * ms(0.22),
  },
  slideinnerContainer: {
    position: 'absolute',
    bottom: '30%',
  },
  Custombutton: {
    backgroundColor: Colors.secondaryColor,
    width: width - 40,
    padding: ms(10),
    borderRadius: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(10),
  },

  disabledButton: {
    backgroundColor: Colors.transparent,
  },
  buttonText: {
    color: Colors.white,
    fontSize: ms(18),
    fontWeight: '700',
    ...Typography.weights.boldU,
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: height * ms(0),
  },
  btnLogin: {
    alignItems: 'center',
    marginTop: mvs(30),
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
    color: Colors.textColorGrey,
    ...Typography.style.smallTextU(),
  },
  textConatiner: {
    left: 10,
  },
  avoidJustify: { justifyContent: 'flex-start' },
  scrollArea: {
    flex: 0.78,
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
    borderWidth: 0.5,
    borderColor: Colors.borderBottomColor,
  },
  TextBordercontainer: {
    flexDirection: 'row',
    borderRadius: mvs(30),
    borderWidth: ms(1),
    borderColor: Colors.grey_50,
    paddingStart: ms(5),
    paddingEnd: ms(5),
    height: ms(50),
    alignItems: 'center',
    width: '100%',
    // marginTop: mvs(10),
  },
  //DashBoard Header
  logoutBorderStyles: {
    width: '100%',
    borderWidth: 0.7,
    borderColor: Colors.light_red,
    backgroundColor: Colors.semilight_red,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: -height * 0.05,
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
    width: width,
    alignSelf: 'center',
    paddingHorizontal: mvs(20),
    paddingRight: mvs(20),
  },

  //Play Card Styles
  playCard: {
    width: ms(180),
    borderRadius: ms(12),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
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

  tabsView: {
    flex: 1, // ✅ Important: allows proper centering inside tab
    alignItems: 'center',
    justifyContent: 'center',
    width: ms(70),
  },
  tabBarStyle: {
    height: ms(55),
    paddingTop: mvs(10),
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    elevation: ms(5),
  },
  flexOne: {
    flex: 1,
  },
  flexShrink1: {
    flexShrink: 1,
  },
  viewRow: {
    flexDirection: 'row',
  },
  alignSpace: {
    justifyContent: 'space-around',
  },
  bottomFooter: {
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBorder: {
    width: '100%',
    height: ms(80),
    borderWidth: ms(1),
    borderColor: Colors.color_E5E7EB,
    borderRadius: mvs(30),
    paddingStart: mvs(15),
    paddingEnd: mvs(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAlign: {
    textAlign: 'center',
  },
  flexEnd: {
    textAlign: 'right',
  },
  colorPrimary: {
    color: Colors.primaryColor,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: ms(40),
    borderTopRightRadius: ms(40),
    paddingLeft: mvs(15),
    paddingRight: mvs(15),
    marginTop: mvs(30),
  },
  mainCard: {
    height: '100%',
  },
  viewRound: {
    backgroundColor: Colors.color_E5E7EB,
    justifyContent: 'center',
  },
  viewCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cardView: {
    width: '100%',
    borderRadius: mvs(10),
    padding: mvs(18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: ms(2) },
    shadowOpacity: mvs(0.1),
    shadowRadius: mvs(4),
    elevation: ms(3),
    backgroundColor: Colors.white,
  },
  fullwidth: {
    width: '100%',
  },

  headerView: {
    backgroundColor: Colors.white,
    height: ms(60),
    justifyContent: 'center',
    width: '100%',
  },
  positionAbsoulute: {
    position: 'absolute',
    left: 0,
    right: 0,
    
  },
  topParentView: {
    paddingStart: mvs(10),
    paddingEnd: mvs(10),
    paddingTop: mvs(10),
  },
  viewRound8: {
    height: ms(80),
    width: ms(80),
    borderRadius: mvs(8),
  },
  qtycircle: {
    height: ms(35),
    width: ms(35),
    borderRadius: 35 / 2,
    borderColor: Colors.color_E5E7EB,
    borderWidth: ms(1),
  },

  qtyView: {
    height: ms(35),
    width: ms(40),
    borderRadius: ms(10),
    borderColor: Colors.color_E5E7EB,
    borderWidth: ms(1),
  },
  viewRound5: {
    borderRadius: ms(7),
    paddingStart: ms(5),
    paddingEnd: ms(5),
    height: ms(40),
  },
  alignItem: {
    alignItems: 'center',
  },
  alignContent: {
    alignContent: 'center',
  },
  viewLine: {
    height: ms(1),
    backgroundColor: Colors.color_E5E7EB,
    width: '100%',
  },
  Full_widthLine: {
    // height: ms(1),
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: colors.borderBottomColor,
  },
  // Modal Styles
  modalDropdownButton: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: ms(10),
  },
  modalSelectedText: {
    fontSize: 14,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalDropdownList: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  modalItem: {
    padding: 12,
  },
  modalItemText: {
    fontSize: 14,
    color: '#333',
  },
  // QRManageMentStyles
  qrInputfield: {
    backgroundColor: Colors.white,
    borderWidth: ms(1),
    borderColor: Colors.grey_50,
    borderRadius: ms(10),
  },
  btnPrimary: {
    borderRadius: ms(10),
    backgroundColor: Colors.primaryColor,
  },
  viewRoundBorder: {
    flexDirection: 'row',
    borderRadius: mvs(30),
    borderWidth: ms(1),
    borderColor: Colors.borderColor,
    paddingStart: ms(5),
    paddingEnd: ms(5),
    height: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mvs(10),
  },
  bottomButton: {
    position: 'absolute',
    bottom: height * 0.1, // ✅ responsive bottom spacing (~4% of screen height)
    alignSelf: 'center',
    width: '90%', // ✅ responsive width
  },
  //promoScreen
  skipButton: {
    position: 'absolute',
    top: height * 0.02, // 5% from top (adjusts with screen)
    right: width * 0.05, // 5% from right (adjusts with screen)
    backgroundColor: colors.secondaryColor,
    borderRadius: width * 0.05,
    padding: 5,
    paddingHorizontal: 15,
  },
  fullScreenContent: {
    flex: 1,
  },
  fullScreenGradient: {
    ...StyleSheet.absoluteFillObject, // 👈 fills full screen automatically
    zIndex: -1,
  },
  Promologo: {
    position: 'absolute',
    top: 40,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },
  videoWrapper: {
    width: width - 40,
    height: height * 0.75,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 130,
    position: 'relative',
    alignSelf: 'center',
    // padding:20
  },
  video: {
    width: '100%',
    height: '100%',
  },
  skipButtonPromo: {
    position: 'absolute',
    top: 20,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  EmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  width40: {
    width: width - 40,
    alignSelf: 'center',
  },
});
export default GlobalStyles;
export const getShadowWithElevation = (elevationValue: number) => {
  const { borderRadius, elevation, ...shadowWithoutRadius } =
    GlobalStyles.shadowStyles;
  return {
    ...shadowWithoutRadius,
    elevation: elevationValue,
  };
};
