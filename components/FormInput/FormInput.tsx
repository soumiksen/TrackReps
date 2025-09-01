import React from 'react';
import { View } from 'react-native';
import ErrorText from '../ErrorText/ErrorText';
import Input from '../Input/Input';
import { FormInputProps } from './FormInput.types';
import styles from './FormInput.styles';

const FormInput = ({
  placeholder,
  onChangeText,
  value,
  onBlur,
  errorType,
  touchedType,
  type='text'
}: FormInputProps) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
        type={type}
      />
      {errorType && touchedType && <ErrorText>{errorType}</ErrorText>}
    </View>
  );
};

export default FormInput;
