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
  type='text',
}: InputProps) => {
  return (
    <TextInput
      style={[styles.input, fullWidth && styles.fullWidth]}
      placeholder={placeholder}
      value={value}
      autoCorrect={autoCorrect}
      onChangeText={onChangeText}
      inputMode={inputMode}
      onBlur={onBlur}
      secureTextEntry={type == 'password' ? true : false}
    />
  );
};

export default Input;
