import React from "react";
import { View, StyleSheet } from "react-native";
import { ms, mvs } from "react-native-size-matters";
import { ZuvyLogo } from "../../../assets/svg";
import { Colors, Typography } from "../../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "../Text";
import GlobalStyles from "../../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";

type BgProps = {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
};

const BackgroundPrimaryColor = ({ title, subTitle, children }: BgProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER AREA */}
      <View style={styles.header}>
        <ZuvyLogo height={ms(40)} />
        <CustomText title={t(title)} textStyle={styles.title} />
        <CustomText title={t(subTitle)} textStyle={styles.subTitle} />
      </View>

      {/* CONTENT AREA */}
      <View style={styles.whiteContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primaryColor },
  header: { alignItems: "center", marginTop: mvs(30) },
  title: {
    textAlign: "center",
    fontSize: ms(24),
    color: Colors.white,
    ...Typography.weights.boldU,
  },
  subTitle: {
    textAlign: "center",
    fontSize: ms(14),
    color: Colors.white,
    marginTop: mvs(5),
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: mvs(20),
    padding: mvs(15),
  },
});

export default React.memo(BackgroundPrimaryColor);