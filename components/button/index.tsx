import { ButtonProps } from "./model";
import { ButtonStyled } from "./styles";

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};
