import styled from 'styled-components/native';
import MaskInput from 'react-native-mask-input';

import { TypoGraphy } from '@/components/typography';
import { yScale } from '@/utils/design';

import { TextFieldProps, TextFieldStyledProps } from './model';

export const TextFieldStyled = styled.View<TextFieldStyledProps>`
  background: ${({ theme, invalid, focused }) =>
    invalid
      ? theme.alerts.danger[200]
      : focused
        ? theme.background[100]
        : theme.primary[500]};

  flex-direction: row;
  align-items: center;
  gap: ${yScale(10)}px;
  border-radius: ${yScale(10)}px;
  border-width: ${yScale(2)}px;
  border-color: ${({ theme, invalid, focused }) =>
    invalid
      ? theme.alerts.danger[100]
      : focused
        ? theme.primary[100]
        : theme.border[100]};
  padding: 0 ${yScale(12)}px;
`;

export const TextFieldMessageStyled = styled(TypoGraphy.label)`
  color: ${({ theme }) => theme.alerts.danger[100]};
  font-size: ${yScale(14)}px;
`;

export const TextFieldBase = styled(MaskInput)<
  Pick<TextFieldProps, 'invalid' | 'message'>
>`
  height: ${({ multiline }) => (multiline ? yScale(90) : yScale(50))}px;
  font-size: ${yScale(16)}px;
  font-family: ${({ theme }) => theme.fontFamily.regular};
  line-height: ${yScale(24)}px;
  width: 100%;
  font-weight: normal;
  max-height: ${yScale(230)}px;
  padding: ${yScale(10)}px 0px;
  padding-bottom: ${yScale(10)}px;
  color: ${({ theme }) => theme.text[100]};
`;

export const TextFieldWrapper = styled.View`
  flex-direction: column;
`;

export const TextFieldRequired = styled(TypoGraphy.label)`
  color: ${({ theme }) => theme.alerts.danger[100]};
`;