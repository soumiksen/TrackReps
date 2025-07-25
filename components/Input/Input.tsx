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
  onBlur
}: InputProps) => {
  return (
    <TextInput
      style={styles.input}
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
