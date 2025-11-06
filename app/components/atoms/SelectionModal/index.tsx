// SelectionModal.tsx
import React from "react";
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { mvs } from "react-native-size-matters";
import { Colors } from "../../../styles";
import FontStyles from "../../../styles/FontStyles";

export default function SelectionModal({ visible, data, onClose, onSelect }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={FontStyles.headingText}>{item.label ?? item}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#0007",
    justifyContent: "center",
    paddingHorizontal: mvs(20),
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: mvs(10),
    maxHeight: "70%",
  },
  item: {
    padding: mvs(14),
    borderBottomWidth: 0.6,
    borderBottomColor: Colors.grey_50 || "#ddd",
  },
  closeBtn: {
    padding: mvs(14),
  },
  closeText: {
    textAlign: "center",
    ...FontStyles.headingText,
  },
});
