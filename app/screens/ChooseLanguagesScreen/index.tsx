import React,{useEffect, useState} from "react";
import { StyleSheet,View } from "react-native";
import {ms,mvs} from 'react-native-size-matters';
import { ChooseLanguagesProps } from "../../navigation/types";
import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import { useTranslation } from 'react-i18next';
import { FlatList } from "react-native-gesture-handler";
import GlobalStyles from "../../styles/GlobalStyles";
import { CustomText } from "../../components/atoms/Text";
import { mt } from "../../utils/spaces";
import Checkbox from "../Checkbox";
import PressableOpacity from "../../components/atoms/PressableOpacity";
import ViewBorder from "../../components/atoms/ViewBorder";
import Button from "../../components/atoms/Button";

const ChooseLanguages = ({navigation} : ChooseLanguagesProps) => {

const languages = [
  { code: 'en', label: 'English',title:'English'},
  { code: 'hi', label: 'हिन्दी',title:'Hindi'},
  { code: 'fr', label: 'Telugu',title : 'Telegu' },
  { code: 'es', label: 'Bengali',title : 'Bengali' }];
      
    const [selectedLang, setSelectedLang] = useState('en'); // Default is English
    const {i18n } = useTranslation();

      const handleLanguageschanges = (item : any) => {
        console.log('Languages '+item?.label),
        setSelectedLang(item?.code),
        i18n.changeLanguage(item?.code)
      }

    const renderItem = ({item}) => {
        return(
            <PressableOpacity onPress={() => handleLanguageschanges(item)}>             
                <ViewBorder style={[GlobalStyles.viewRow,mt(20)]}>
                <View style={GlobalStyles.flexOne}>
                <CustomText textStyle={[GlobalStyles.headingText]} title={item?.title}/>
                <CustomText textStyle={[GlobalStyles.subText]} title={item?.label}/>
              </View>
                <Checkbox isChecked = {item?.code === selectedLang ? true : false}/>
                
               </ViewBorder> 
               </PressableOpacity>
        )
    }

    const onHandleOnPress = () =>{
      navigation.navigate('OnBoard')
    }

return (
  <BackgroundPrimaryColor
    title="select_your_language"
    subTitle="choose_language_title">
    <View style={{ flex: 1 }}>
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: mvs(80) }} // ✅ Add space for button
      />
    </View>

    {/* ✅ Button fixed */}
    <View style={styles.list}>
      <Button title="continue" onPress={onHandleOnPress} />
    </View>
  </BackgroundPrimaryColor>
);


}

const styles = StyleSheet.create({
  list:{  
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
    backgroundColor: 'white',
    paddingVertical: mvs(10),

  }
})


export default React.memo(ChooseLanguages);