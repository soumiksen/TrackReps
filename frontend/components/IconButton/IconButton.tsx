import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './IconButton.styles';

const IconButton = ({ onPress, variant = 'primary', name, style }: any) => {
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
        <Ionicons
        name={name}
        size={16}
          style={[
            variant === 'primary' && styles.textPrimary,
            variant === 'secondary' && styles.textSecondary,
            variant === 'outlined' && styles.textOutlined,
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default IconButton;
