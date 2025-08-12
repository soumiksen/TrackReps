import { StyleProp, ViewStyle } from 'react-native';

export type ButtonProps = {
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outlined';
  children: string;
  style?: StyleProp<ViewStyle>;
};
