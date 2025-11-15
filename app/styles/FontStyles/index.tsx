import { StyleSheet } from "react-native";
import { ms, mvs } from 'react-native-size-matters';
import { screenWidth,screenHeight } from '../../utils/dimensions';
import { Colors, Typography } from "..";

const FontStyles = StyleSheet.create({
      
    mobileText: {
        fontSize: ms(24),
    color: Colors.white,
    ...Typography.weights.mediumU
  },

 mainText: {
    fontSize: ms(24),
    fontWeight: 'bold',
    ...Typography.weights.boldU
  },

   title: {
    fontSize: ms(24),
    fontWeight:'700',
    color: Colors.white,
    textAlign: 'left',
    ...Typography.weights.boldU
  },
  text: {
    fontSize: ms(16),
    color: Colors.white,
    ...Typography.weights.mediumU
  },

   imageText: {
    color: Colors.white,
    fontSize: ms(14),
    ...Typography.weights.mediumU
  },

   buttonText: {
    color: Colors.black,
    fontSize: ms(14),
    fontWeight:'700',
    ...Typography.weights.boldU,
  },
   headingText: {
        fontSize: ms(16),
        color: Colors.black,
        fontWeight:'600',
        ...Typography.weights.boldU,
    },
    fontAsterisk : {
    fontSize: ms(12),
        color: Colors.red,
        fontWeight: '400',
        ...Typography.weights.mediumU,
    },
    subText: {
        fontSize: ms(12),
        color: Colors.black,
        fontWeight: '400',
        ...Typography.weights.mediumU,
    },
    subTextError: {
        fontSize: ms(12),
        color: Colors.red,
        fontWeight: '400',
        ...Typography.weights.mediumU,
    },
    tabsText :{
      fontWeight:'400',
      fontSize:ms(12),
      ...Typography.weights.normalU,
      textAlign:'center',
    },

    txtInput :{
        fontSize: ms(14),
        color: Colors.black,
        flex: 1,
        ...Typography.weights.mediumU,
    },
    zuvyLetters :{
      fontSize: ms(25),
    fontWeight: '700',
    marginHorizontal: 6,
    color: Colors.white,
    ...Typography.weights.boldU,
    },
   
      subTitle: {
        textAlign: "center",
        fontSize: ms(14),
        color: Colors.white,
        marginTop: mvs(5),
        ...Typography.weights.normalU
      },
      

})

export default FontStyles;
