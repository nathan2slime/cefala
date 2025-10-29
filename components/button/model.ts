import { TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps &
  Partial<{
    rounded: boolean;
    block: boolean;
    disabled: boolean;
    icon: boolean;
    size: "small" | "large";
    variant: "solid" | "outline";
  }>;
