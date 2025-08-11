import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function GradientBackground({ children }) {
  return (
    <LinearGradient
      colors={['#F2F4FF', '#A9C7FF']}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0.5 }} 
      end={{ x: 1, y: 1 }} 
    >
      <View style={styles.overlay}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
