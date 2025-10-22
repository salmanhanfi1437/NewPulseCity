import React from 'react';
import { StyleSheet,View,Modal } from 'react-native';
import {ms,mvs} from 'react-native-size-matters';
import PropTypes from "prop-types";
import AnimatedLoader from 'react-native-animated-loader';


type LoaderProps = {
    isVisible : boolean
}

const Loader =({isVisible} : LoaderProps) => {

    isVisible ? (
        <Modal
        animationType='fade'
        transparent={true}
        visible={isVisible}>

         <View style={styles.mainContainer}>
            
            <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.25)"
          source={require("../../../assets/lottie/loader.json")}
          animationStyle={styles.lottie}
          speed={1}></AnimatedLoader>
            </View>   



        </Modal>
    ) : null
}

Loader.prototypes = {
    isVisible : PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
    mainContainer : {
        position:'absolute',
        top:0,
        left:0,
        backgroundColor:'transparent',
        right:0,
        bottom : 0,
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        zIndex:10
    },
    lottie : {
        width:ms(200),
        height:ms(200)
    }
});

export default Loader;
