import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ContainerProps = {
  children: ReactNode;
  mode?: 'default' | 'tab' | 'chat';
  style?: StyleProp<ViewStyle>
};
