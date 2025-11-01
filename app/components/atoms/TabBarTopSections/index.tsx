import React from "react";
import { ImageSourcePropType, StyleSheet,View } from "react-native";
import { Colors } from "../../../styles";
import { ms, mvs } from "react-native-size-matters";
import { DashBoardSVG, NotificationSVG } from "../../../assets/svg";
import GlobalStyles from "../../../styles/GlobalStyles";
import { CustomText } from "../Text";
import Image from "../Image";
import FastImage from "react-native-fast-image";
import FontStyles from "../../../styles/FontStyles";


type TabBarTopSectionsProps = {
    title? : string,
    subTitle? : string,
    notificationCount? : number;
    profilePic? : ImageSourcePropType;
    bgColor? : string;
    onPress? : () => void;
}

const TabBarTopSections = ({title,subTitle,notificationCount,profilePic,bgColor,onPress} : TabBarTopSectionsProps) =>
{
    return(
        <View style={[styles.container,GlobalStyles.viewRow,{backgroundColor : bgColor}]}>

        <DashBoardSVG width={ms(40)} height={ms(40)} />    

        <View style={[styles.marginLeft,GlobalStyles.flexOne]}> 
        <CustomText title={title} textStyle={FontStyles.buttonText}/>
        <CustomText title={subTitle + ' salman'} textStyle={[FontStyles.tabsText,styles.subtitle]}/>
        </View>


        <NotificationSVG width={ms(25)} height={ms(25)} />

        <Image
        source={{
          uri: 'https://randomuser.me/api/portraits/men/75.jpg',
          priority: FastImage.priority.normal,
        }}
        style={styles.profilePic}
        resizeMode={FastImage.resizeMode.cover}/>
      

        </View>
    )

}

const styles = StyleSheet.create({
    container : {
        backgroundColor:Colors.primaryColor,
        height:ms(80),
        paddingStart:mvs(15),
        paddingRight:mvs(15),
        justifyContent:"flex-start",
        alignItems:'center'
    },
    marginLeft: {
        marginLeft:mvs(10)
    },
    subtitle:{
        color:Colors.white,
        alignSelf:'flex-start'
    },
    profilePic: {
  width: ms(30),
  height: ms(30),
  borderRadius: ms(30) / 2,   // make it circular
  marginLeft: ms(10),
  borderWidth: ms(1),             // thickness of border
  borderColor:Colors.black,
    }
});

export default React.memo(TabBarTopSections);