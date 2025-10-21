import React from "react";
import { View, StyleSheet } from "react-native";
import { ms, mvs } from "react-native-size-matters";
import { AppLogoSVG } from "../../../assets/svg";
import { Colors, Typography } from "../../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "../Text";

type BgProps = {
  title?: string;
  children?: React.ReactNode;
};

const BackgroundPrimaryColor = ({ title, children }: BgProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Give flex: 1 to main wrapper */}
      <View style={styles.innerContainer}>
        <View style={styles.mainHeader}>
          <AppLogoSVG width={ms(41)} height={ms(32)} />

          <CustomText
            title={title?.split("\\n").join("\n")}
            textStyle={styles.title}
          />
          <CustomText
            title="Log in to continue your journey"
            textStyle={styles.titleLogin}
          />
        </View>

        {/* ✅ Allow scrollable content to expand */}
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  innerContainer: {
    flex: 1, // ✅ important
    flexDirection: "column",
  },
  mainHeader: {
    marginTop: mvs(15),
    marginStart: mvs(15),
    marginRight: mvs(15),
  },
  title: {
    fontSize: ms(32),
    fontWeight: "700",
    letterSpacing: mvs(2),
    color: Colors.white,
    marginTop: mvs(20),
    ...Typography.weights.boldU,
  },
  titleLogin: {
    color: Colors.grey_50,
    fontWeight: "400",
    fontSize: ms(12),
    ...Typography.weights.normalU,
  },
  contentContainer: {
    flex: 1, // ✅ let child (ScrollView) take all remaining space
    marginTop: mvs(40),
  },
});

export default React.memo(BackgroundPrimaryColor);