import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { ms } from "react-native-size-matters";
import colors from "../../styles/colors";
import { TickWhiteSVG } from "../../assets/svg";
import PressableOpacity from "../../components/atoms/PressableOpacity";

type CheckBoxProps = {
  onPress?: () => void;
  isChecked?: boolean;
};

const CheckboxBorder = ({ isChecked = false, onPress }: CheckBoxProps) => {
  return (
    <PressableOpacity onPress={onPress} style={styles.pressable}>
      <View style={styles.box}>
        {isChecked && <TickWhiteSVG width={ms(16)} height={ms(16)} />}
      </View>
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  pressable: {
    padding: ms(4), // touch area thoda bada kar diya
  },
  box: {
    width: ms(20),
    height: ms(20),
    borderRadius: ms(6),
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(CheckboxBorder);