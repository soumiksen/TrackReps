import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Container.styles';
import { ContainerProps } from './Container.types';

const Container = ({ children, mode = 'default', style }: ContainerProps) => {
  if (mode === 'tab') {
    return <View style={styles.safeArea}>{children}</View>;
  }

  if (mode === 'chat') {
    return (
      <SafeAreaView style={[styles.safeArea, { paddingHorizontal: 0 }, style]}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
        {children}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;
