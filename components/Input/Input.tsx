import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './Input.styles';
import { InputProps } from './Input.types';

const Input = ({
  placeholder,
  value,
  autoCorrect,
  onChangeText,
  inputMode = 'text',
  onBlur,
  fullWidth = false,
}: InputProps) => {
  return (
    <TextInput
      style={fullWidth ? styles.fullWidth : styles.input}
      placeholder={placeholder}
      value={value}
      autoCorrect={autoCorrect}
      onChangeText={onChangeText}
      inputMode={inputMode}
      onBlur={onBlur}
    />
  );
};

export default Input;
