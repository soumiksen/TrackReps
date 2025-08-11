import React from 'react';
import { View } from 'react-native';
import styles from './Paper.styles';

const Paper = ({
  children,
  fullWidth = false,
  style,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  style?: any;
}) => {
  return (
    <View style={[styles.paper, fullWidth && styles.paperFlex, style && style]}>
      {children}
    </View>
  );
};

export default Paper;
