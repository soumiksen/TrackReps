import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Container.styles';
import { ContainerProps } from './Container.types';

const Container = ({ children, mode = 'default' }: ContainerProps) => {
  if (mode == 'tab' ){
    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
};


export default Container;
