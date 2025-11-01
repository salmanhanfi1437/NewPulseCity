import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { mvs } from "react-native-size-matters";
import { ChooseLanguagesProps } from "../../navigation/types";
import BackgroundPrimaryColor from "../../components/atoms/BackgroundPrimaryColor";
import { useTranslation } from "react-i18next";
import GlobalStyles from "../../styles/GlobalStyles";
import { CustomText } from "../../components/atoms/Text";
import { mt } from "../../utils/spaces";
import Checkbox from "../Checkbox";
import ViewBorder from "../../components/atoms/ViewBorder";
import FontStyles from "../../styles/FontStyles";
import {
  choose_language_title,
  const_continue,
  select_your_language,
} from "../../types/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { fetchLanguagesRequest } from "./chooseLanguageSlice";
import Button from "../../components/atoms/Button";

const ChooseLanguages = ({ navigation }: ChooseLanguagesProps) => {
  const languages = [
    { code: "en", label: "English", title: "English" },
    { code: "hi", label: "हिन्दी", title: "Hindi" },
    { code: "te", label: "తెలుగు", title: "Telugu" },
    { code: "bn", label: "বাংলা", title: "Bengali" },
  ];

  const [selectedLang, setSelectedLang] = useState("en");
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const { language, error } = useSelector((state: RootState) => state.chooseLanguage);

  useEffect(() => {
    dispatch(fetchLanguagesRequest());
  }, [dispatch]);

  const handleLanguageschanges = (item: any) => {
    setSelectedLang(item.code);
    i18n.changeLanguage(item.code);
  };

  const renderItem = ({ item }) => (
    <ViewBorder
      style={[GlobalStyles.viewRow, mt(20)]}
      onPress={() => handleLanguageschanges(item)}
    >
      <View style={GlobalStyles.flexOne}>
        <CustomText textStyle={[FontStyles.headingText]} title={item.title} />
        <CustomText textStyle={[FontStyles.subText]} title={item.label} />
      </View>
      <Checkbox isChecked={item.code === selectedLang} />
    </ViewBorder>
  );

  const onHandleOnPress = () => {
    navigation.navigate("OnBoard");
  };

  return (
    <BackgroundPrimaryColor
      title={select_your_language}
      subTitle={choose_language_title}
    >
      <KeyboardAvoidingView
        style={GlobalStyles.flexOne}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={mvs(60)} // adjust if needed
      >
        <View style={GlobalStyles.flexOne}>
          <FlatList
            data={languages}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        {/* ✅ Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <Button title={const_continue} onPress={onHandleOnPress} />
        </View>
      </KeyboardAvoidingView>
    </BackgroundPrimaryColor>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: mvs(100), // space for button
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: mvs(20),
    left: mvs(5),
    right: mvs(5),
  },
});

export default React.memo(ChooseLanguages);
