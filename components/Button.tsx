import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, variant="primary", children }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={variant == "outlined" ? styles.btnOutlined: styles.btn}>
      <Text style={variant == "outlined" ? styles.textOutlined: styles.textColor}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    backgroundColor: '#199EFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  btnOutlined: {
    padding: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#199EFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  textColor: {
    color: 'white',
  },
  textOutlined: {
    color: '#199EFF',
  }
});

export default Button;
