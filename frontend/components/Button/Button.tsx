import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './Button.styles';
import { ButtonProps } from './Button.types';

const Button = ({
  onPress,
  variant = 'primary',
  children,
  style,
}: ButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.btn,
          style,
          variant === 'primary' && styles.btnPrimary,
          variant === 'secondary' && styles.btnSecondary,
          variant === 'outlined' && styles.btnOutlined,
        ]}
      >
        <Text
          style={[
            variant === 'primary' && styles.textPrimary,
            variant === 'secondary' && styles.textSecondary,
            variant === 'outlined' && styles.textOutlined,
          ]}
        >
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;
