export type ButtonProps = {
  onPress: () => void;
  variant?: 'primary' | 'outlined';
  children: string;
};