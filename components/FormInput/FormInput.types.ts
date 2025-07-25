export type FormInputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  onBlur: () => void;
  errorType: any;
  touchedType: any
}