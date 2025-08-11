import React from 'react';
import { View } from 'react-native';
import styles from './VerticalProgressBar.styles';

const VerticalProgressBar = ({ completed }: any) => {
  return <View style={styles.verticalProgress} >
    <View style={[styles.fill, { height: `${completed}%` }]} />
  </View>;
};

export default VerticalProgressBar;
