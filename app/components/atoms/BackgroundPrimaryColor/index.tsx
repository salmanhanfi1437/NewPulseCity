import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ms, mvs } from "react-native-size-matters";
import { ZuvyLogo } from "../../../assets/svg";
import { Colors } from "../../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "../Text";
import GlobalStyles from "../../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";
import FontStyles from "../../../styles/FontStyles";
import { flexGrow,} from "../../../utils/spaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type BgProps = {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  enableKeyboardScroll?: boolean; // 👈 new prop

};

const BackgroundPrimaryColor = ({ title, subTitle, children }: BgProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER AREA */}
      <View style={styles.header}>
        <ZuvyLogo height={ms(40)} />
        <CustomText title={t(title)} textStyle={FontStyles.title} />
        <CustomText title={t(subTitle)} textStyle={FontStyles.subTitle} />
      </View>

      {/* CONTENT AREA */}

      
         <KeyboardAwareScrollView
                style={[GlobalStyles.keyboardView]}
                contentContainerStyle={flexGrow(1)}
                enableOnAndroid={true}
                extraScrollHeight={mvs(80)} 
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                
        {children}


                </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primaryColor },
  header: { alignItems: "center", marginTop: mvs(30) },
  
  whiteContainer: {
   flex: 1,
  backgroundColor: Colors.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: mvs(20),
  paddingVertical: mvs(15),
  paddingHorizontal: ms(20), // ✅ add this
  },
});

export default React.memo(BackgroundPrimaryColor);