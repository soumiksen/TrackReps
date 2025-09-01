export type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  autoCorrect?: boolean;
  inputMode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url';
  onBlur?: () => void;
  fullWidth?: boolean;
  type?: 'text' | 'password';
};
