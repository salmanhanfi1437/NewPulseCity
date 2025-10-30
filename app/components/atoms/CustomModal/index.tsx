import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../styles';

interface DropdownProps {
  data: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View >
      <TouchableOpacity
        style={GlobalStyles.modalDropdownButton}
        onPress={() => setVisible(true)}
      >
        <Text style={GlobalStyles.modalSelectedText}>
          {selectedValue || placeholder}
        </Text>
        <MaterialIcons
          name={visible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={22}
          color={Colors.black}
        />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={GlobalStyles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={GlobalStyles.modalDropdownList}>
            <FlatList
              data={data}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={GlobalStyles.modalItem}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={GlobalStyles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;
