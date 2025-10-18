import React from "react";
import {View,Text,StyleSheet} from 'react-native';
import { ms, mvs } from 'react-native-size-matters';
import { AppLogoSVG } from "../../../assets/svg";
import { Colors, Typography } from "../../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "../Text";

type BgProps = {
    title?: string,
    children?: React.ReactNode; //allowed nested content
}


const BackgroundPrimaryColor = ({title,children} : BgProps) => {

    return(
        <SafeAreaView style ={styles.container}>
        <View>

        <View style={styles.mainHeader}> 

        <AppLogoSVG width={ms(41)} height={ms(32)}/>
        

        <CustomText title={title?.split('\\n').join('\n')} textStyle={styles.title} />
        <CustomText title="Log in to continue your journey" textStyle={styles.titleLogin} />

        </View>

        {/* here will add childrens */}
        <View style={styles.contentContainer}>
        {children}
        </View>

        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container : {
        flex:1,
        flexDirection:'column',
        backgroundColor:Colors.primaryColor
    },
    mainHeader:{
        marginTop:mvs(15),
        marginStart : mvs(15),
        marginRight:mvs(15),
    },
    title : {
        fontSize:ms(32),
        fontWeight:'700',
        letterSpacing : mvs(2),
        color : Colors.white,
        marginTop:mvs(20),
        ...Typography.weights.boldU
    },
    titleLogin : {
        color:Colors.grey_50,
        fontWeight:'400',
        fontSize:ms(12),
        ...Typography.weights.normalU
    },
    contentContainer : {
        marginTop:mvs(40)
    }
    
})


export default React.memo(BackgroundPrimaryColor);