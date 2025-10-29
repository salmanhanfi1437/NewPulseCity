import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../styles';

const { width, height } = Dimensions.get('window');

interface CardContainerProps {
  children: ReactNode;
  style?: object;
}

const CardContainer: React.FC<CardContainerProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});

export default CardContainer;
