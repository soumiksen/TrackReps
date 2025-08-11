import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Container.styles';
import { ContainerProps } from './Container.types';

const Container = ({ children, mode = 'default' }: ContainerProps) => {
  if (mode == 'tab') {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;
