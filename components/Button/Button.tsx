import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Button.styles';
import { ButtonProps } from './Button.types';

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
