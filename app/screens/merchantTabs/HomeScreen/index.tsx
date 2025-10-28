import React from 'react';
import { StyleSheet,View } from 'react-native';
import { MerchantHomeScreenProps } from '../../../navigation/types';
import TabBarTopSections from '../../../components/atoms/TabBarTopSections';
import { Colors } from '../../../styles';
import { welcomeBack, zuvy_disctributor } from '../../../types/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import { mvs } from 'react-native-size-matters';

const HomeScreen = ({navigation,route } : MerchantHomeScreenProps) => {

    return(
        <View>
           <TabBarTopSections bgColor={Colors.primaryColor} title={zuvy_disctributor} subTitle={welcomeBack}/>
            
            <View style={styles.container}>



            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container : {
        paddingStart:mvs(10),
        paddingRight:mvs(10),
        marginTop:mvs(10)
    }
})

export default HomeScreen;