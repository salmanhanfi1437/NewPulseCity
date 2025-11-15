import { StyleSheet } from "react-native";
import { ms, mvs } from "react-native-size-matters";
import { Colors } from "../../styles";
import GlobalStyles from "../../styles/GlobalStyles";
import FontStyles from "../../styles/FontStyles";
import colors from "../../styles/colors";
import { screenWidth } from "../../utils/dimensions";
import { mt } from "../../utils/spaces";

const CartStyles = StyleSheet.create({
     viewitemTotal :{
    ...GlobalStyles.viewRound5,
    ...GlobalStyles.viewRow,
    ...GlobalStyles.alignItem,
    justifyContent: 'space-between', 
    backgroundColor: Colors.color_EFF6FF,
    marginTop: mvs(15),
    borderWidth: 0,
    
    },
   itemTotalText: {
  ...FontStyles.subText,
  color:Colors.color_4B5563,
  ...GlobalStyles.textAlign,
},
viewQty : {
    ...GlobalStyles.viewRow,
    marginTop:mvs(10),
    ...GlobalStyles.viewCenter,
   
},
qtyText:{
    ...FontStyles.subText,
    color: Colors.color_4B5563,
    ...GlobalStyles.flexOne
},
subTitleText:{
    ...FontStyles.subText,
    color:Colors.color_4B5563,
    marginTop: mvs(5)
},
viewLinearGradient : {
...GlobalStyles.viewRound8,
...GlobalStyles.viewCenter
},
priceBreakDownText:{
    ...FontStyles.headingText,
    ...GlobalStyles.textAlign,
    marginLeft:mvs(10),
},
viewTotal : {
    ...GlobalStyles.viewRow,
    ...GlobalStyles.alignItem
},
viewSubTotal : {
    marginTop: mvs(10),
    justifyContent: 'space-between',
    flexDirection:'row'
},
mainQTY:{
    ...GlobalStyles.qtyView,
    marginLeft : mvs(7),
    marginRight : mvs(7),
    ...GlobalStyles.viewCenter,
},
viewViewIncluded : {
    borderRadius:ms(10),
    borderColor:Colors.color_BBF7D0,
    borderWidth:ms(1),
    marginTop:mvs(10),
    padding:mvs(15),
    marginBottom:mvs(5),
    alignItems:'center',
},
circleGreen : {
    width: ms(40),
  height: ms(40),
  borderRadius: ms(40) / 2,
  backgroundColor: colors.color_22C55E,
},
  textincluded: {
  ...FontStyles.subText,
  color:Colors.color_4B5563,
},
totalView:{
    borderTopWidth:ms(1),
    borderColor:Colors.color_E5E7EB,
    padding:mvs(10),
    backgroundColor:Colors.white,
},
btnBuyNow:{
   ...GlobalStyles.btnPrimary,
   ...GlobalStyles.viewRow,
   ...GlobalStyles.viewCenter,
   marginTop:mvs(10)
},

});
export default CartStyles;