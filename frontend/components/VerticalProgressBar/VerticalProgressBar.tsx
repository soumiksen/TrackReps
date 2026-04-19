import React from 'react';
import { Text, View } from 'react-native';
import styles from './VerticalProgressBar.styles';

const VerticalProgressBar = ({ completed, label, active }: any) => {
  console.log({ completed });
  return (
    <View style={styles.container}>
      <View style={styles.verticalProgress}>
        <View
          style={[styles.fill, { height: `${parseInt(completed) * 0.5}%` }]}
        />
      </View>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </View>
  );
};

export default VerticalProgressBar;
