import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Typography } from '.';
import { ms, mvs } from 'react-native-size-matters';
import { screenWidth } from '../utils/dimensions';

const { width, height } = Dimensions.get('window');

const GlobalStyles = StyleSheet.create({
  main : {
    flex: 1,
    backgroundColor: Colors.primaryColor,
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
  
    tabsView: {
  flex: 1,  // ✅ Important: allows proper centering inside tab
  alignItems: 'center',
  justifyContent: 'center',
  width: ms(70),
},
    tabBarStyle: {
  height: ms(60),
  paddingTop: mvs(10),
  backgroundColor: Colors.white,
  borderTopWidth: 0,
  elevation: ms(5),
},
flexOne : {
  flex:1
},
viewRow:{
  flexDirection:'row'
},
alignSpace:{
  justifyContent:'space-around'
},
bottomFooter: {
  position: "absolute",
  bottom: 10,
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
},
viewBorder : {

  width:'100%',
  height:ms(80),
  borderWidth:ms(1),
  borderColor:Colors.color_E5E7EB,
  borderRadius:mvs(30),
  paddingStart:mvs(15),
  paddingEnd:mvs(15),
  justifyContent:'center',
  alignItems:'center'
},
textAlign : {
  textAlign:'center'
},
flexEnd :{
        textAlign:'right'
    },
    colorPrimary : {
      color: Colors.primaryColor
    },
      keyboardView: {
            flex: 1,
            backgroundColor: Colors.white,
            borderTopLeftRadius:ms(20),
            borderTopRightRadius:ms(20),
            paddingLeft:mvs(15),
            paddingRight:mvs(15),
            marginTop:mvs(30)
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
  cardView:{
    width:'100%',
     borderRadius: mvs(10),
    padding: mvs(18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: ms(2) },
    shadowOpacity: mvs(0.10),
    shadowRadius: mvs(4),
    elevation: ms(5),
    backgroundColor:Colors.white
  },
  fullwidth: {
     width: '100%',
  },

  headerView : {
    backgroundColor:Colors.white,
    height:ms(60),
    justifyContent:'center',
    width:'100%',
  },
  positionAbsoulute:{
    position:'absolute',
    left:0,
    right:0
  },
  topParentView :{
    paddingStart:mvs(10),
    paddingEnd:mvs(10),
    paddingTop:mvs(20)
  },
  viewRound8:{
    height:ms(80),
    width:ms(80),
    borderRadius:mvs(8)
  },
  qtycircle:{
    height:ms(35),
    width:ms(35),
    borderRadius:35/2,
    borderColor:Colors.color_E5E7EB,
    borderWidth:ms(1)
  },

  qtyView:{
    height:ms(35),
    width:ms(40),
    borderRadius:ms(10),
    borderColor:Colors.color_E5E7EB,
    borderWidth:ms(1)
  },
  viewRound5:{
        borderRadius:ms(7),
        paddingStart:ms(5),
        paddingEnd:ms(5),
        height:ms(40)
  },
  alignItem:{
    alignItems:'center'
  },
  alignContent:{
    alignContent:'center'
  },
  viewLine : {
    height:ms(2),
    backgroundColor:Colors.color_E5E7EB,
    width:'100%'
  },
  btnPrimary : {
    borderRadius:ms(10),
    backgroundColor:Colors.primaryColor
  },
});
export default GlobalStyles;
