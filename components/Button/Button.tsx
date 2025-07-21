import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from './Button.types';
import styles from './Button.styles';

const Button = ({ onPress, variant = 'primary', children }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={variant == 'outlined' ? styles.btnOutlined : styles.btn}
    >
      <Text
        style={variant == 'outlined' ? styles.textOutlined : styles.textColor}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};


export default Button;
