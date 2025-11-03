import React, { ReactNode, memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../styles';

const { width, } = Dimensions.get('window');

interface CardContainerProps {
  children: ReactNode;
  style?: object;
  showShadow?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  style,
  showShadow = true,
}) => {
  return (
    <View style={[styles.card, style, !showShadow && styles.noShadow]}>
      {children}
    </View>
  );
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
  noShadow: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
});

export default memo(CardContainer);
