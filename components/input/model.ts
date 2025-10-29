import { ReactNode } from "react";
import { MaskInputProps } from "react-native-mask-input";

export type TextFieldProps = Partial<{
  icon: ReactNode;
  label: string;
  message: string;
  invalid: boolean;
  required: boolean;
}> &
  MaskInputProps;

export type TextFieldStyledProps = Partial<{
  focused: boolean;
}> &
  Pick<TextFieldProps, "invalid" | "message">;
