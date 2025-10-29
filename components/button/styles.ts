import styled from 'styled-components/native';

import { xScale, yScale } from '@/utils/design';

import { ButtonProps } from './model';

export const ButtonStyled = styled.TouchableOpacity<ButtonProps>`
  background: ${({ disabled, variant = 'solid', theme }) =>
    variant == 'solid'
      ? disabled
        ? theme.primary[300]
        : theme.primary[100]
      : 'transparent'};
  border-radius: ${yScale(15)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${xScale(2)}px;
  width: ${({ block = true, icon }) =>
    icon ? '60px' : block ? '100%' : 'auto'};
  height: ${({ size = 'large' }) => yScale(size == 'large' ? 50 : 45)}px;
  border-width: ${yScale(2)}px;
  border-color: ${({ variant = 'solid', theme }) =>
    variant == 'solid' ? 'transparent' : theme.border[200]};
`;