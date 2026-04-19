import React from 'react';
import { Text } from 'react-native';
import styles from './ErrorText.styles';

const ErrorText = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Text style={styles.errorText}>{children}</Text>
    </>
  );
};

export default ErrorText;
