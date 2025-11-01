import { StyleSheet } from "react-native";
import { ms, mvs } from "react-native-size-matters";
import GlobalStyles from "../../styles/GlobalStyles";
import { Colors } from "../../styles";
import { position } from "native-base/lib/typescript/theme/styled-system";
import FontStyles from "../../styles/FontStyles";

const NotificationStyles = StyleSheet.create({

    tabs : {
     paddingVertical: mvs(10),
    paddingHorizontal: mvs(15),
    alignItems: "center",
    justifyContent: "center",
    },
    tabIndicator:{
    height: ms(4),
    width: ms(65),
      marginTop: ms(8), // 👈 adds gap between text and indicator
    },
    itemViews:{
      padding:mvs(10),
      backgroundColor:Colors.white,
    },
    viewNew : {
      width:ms(40),
      height:ms(30),
      borderRadius:ms(30)/2,
      backgroundColor:Colors.color_DBEAFE,
      position:'absolute',
      right:0
    },
    newText:{
      ...FontStyles.subText,
      ...GlobalStyles.textAlign,
      color:Colors.white,
    }
});

export default NotificationStyles;