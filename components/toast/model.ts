import { EdgeInsets } from 'react-native-safe-area-context';

export type ToastOptions = {
  message: string;
  color: 'success' | 'default' | 'danger' | 'warning';
};

export type ToastWrapperProps = {
  insets: EdgeInsets;
};