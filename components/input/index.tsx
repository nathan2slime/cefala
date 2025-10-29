import { useState } from "react";

import { TypoGraphy } from "@/components/typography";
import { Space } from "@/components/space";
import { FormRow } from "@/components/forms/styles";

import { themes } from "@/themes";

import { TextFieldProps } from "./model";
import {
  TextFieldWrapper,
  TextFieldBase,
  TextFieldStyled,
  TextFieldMessageStyled,
  TextFieldRequired,
} from "./styles";

export const TextField = ({
  value,
  icon,
  multiline,
  placeholder,
  secureTextEntry,
  numberOfLines,
  maxLength,
  onChangeText,
  onFocus,
  onBlur,
  message,
  invalid,
  label,
  required,
  ...props
}: TextFieldProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <TextFieldWrapper>
      <FormRow>
        {label && <TypoGraphy.label>{label}</TypoGraphy.label>}
        <Space x={2} />

        {required && <TextFieldRequired>*</TextFieldRequired>}
      </FormRow>

      <Space y={3} />

      <TextFieldStyled focused={focused} invalid={invalid} message={message}>
        {icon}

        <TextFieldBase
          placeholder={placeholder}
          placeholderTextColor={themes.light.text[200]}
          value={value}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          textAlignVertical={multiline ? "top" : "center"}
          onBlur={(e) => {
            setFocused(false);

            onBlur && onBlur(e);
          }}
          onFocus={(e) => {
            setFocused(true);

            onFocus && onFocus(e);
          }}
          {...props}
        />
      </TextFieldStyled>

      <Space y={1} />

      {invalid && <TextFieldMessageStyled>{message}</TextFieldMessageStyled>}
    </TextFieldWrapper>
  );
};
