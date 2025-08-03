import { ReactNode } from 'react';

export type ContainerProps = {
  children: ReactNode;
  mode?: 'default' | 'tab';
};
