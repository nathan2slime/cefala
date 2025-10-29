import styled from 'styled-components/native';

import { yScale } from '@/utils/design';

import { TypoGraphyProps } from './model';

const BaseText = styled.Text<TypoGraphyProps>`
  color: ${({ theme }) => theme.text[100]};
  letter-spacing: ${yScale(0.03)}px;
  font-family: ${({ theme }) => theme.fontFamily.regular};
`;

export const TypoGraphy = {
  h1: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: ${yScale(32)}px;
  `,
  h2: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: ${yScale(24)}px;
  `,
  h3: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: ${yScale(20)}px;
  `,
  h4: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: ${yScale(18)}px;
  `,
  h5: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: ${yScale(16)}px;
  `,
  h6: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: ${yScale(14)}px;
  `,
  p: styled(BaseText)`
    font-size: ${yScale(16)}px;
  `,
  button: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    text-transform: uppercase;
    font-size: ${yScale(16)}px;
  `,
  strong: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.semiBold};
    font-size: ${yScale(16)}px;
  `,
  description: styled(BaseText)`
    font-size: ${yScale(16)}px;
  `,
  subtitle: styled(BaseText)`
    font-family: ${({ theme }) => theme.fontFamily.semiBold};
    font-size: ${yScale(18)}px;
  `,
  label: styled(BaseText)`
    font-size: ${yScale(15)}px;
  `,
};