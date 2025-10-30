import React from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  barStyle?: 'light-content' | 'dark-content' | 'default';
  backgroundColor?: string;
};

const StatusBarManager: React.FC<Props> = ({
  barStyle = 'default',
  backgroundColor = 'transparent',
}) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(barStyle);
      StatusBar.setBackgroundColor(backgroundColor);
    }, [barStyle, backgroundColor])
  );

  return null;
};

export default StatusBarManager;
