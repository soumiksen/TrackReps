import React from 'react';
import { View, Text } from 'react-native';
import styles from './VerticalProgressBar.styles';

const VerticalProgressBar = ({ completed, label, active }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.verticalProgress}>
        <View style={[styles.fill, { height: `${completed}%` }]} />
      </View>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </View>
  );
};

export default VerticalProgressBar;
