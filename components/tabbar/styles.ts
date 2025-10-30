import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { MotiImage } from 'moti';

import { TypoGraphy } from '@/components/typography';

import { yScale } from '@/utils/design';

import { TabBarItemProps, TabBarStyledProps } from './model';

export const TabBarStyled = styled.View<TabBarStyledProps>`
  width: 100%;
  height: ${yScale(70)}px;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  border-top-color: ${({ theme }) => theme.border[200]};
  margin-bottom: ${({ insets }) => insets.bottom}px;
  background: ${({ theme }) => theme.background[100]};
  padding: 0 ${yScale(15)}px;
`;

export const TabBarItem = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: ${yScale(1)}px;
  flex-direction: column;
  padding: 0 ${yScale(10)}px;
`;

export const TabBarItemIcon = styled(Ionicons)<TabBarItemProps>`
  font-size: ${yScale(24)}px;
  color: ${({ theme, active }) =>
    active ? theme.primary[200] : theme.text[100]};
`;

export const TabBarItemText = styled(TypoGraphy.p)<TabBarItemProps>`
  font-size: ${yScale(12)}px;
  font-family: ${({ theme, active }) =>
    active ? theme.fontFamily.semiBold : theme.fontFamily.semiBold};
  text-transform: capitalize;
  color: ${({ theme, active }) =>
    active ? theme.primary[200] : theme.text[100]};
`;

export const TabBarAction = styled.View`
  background: ${({ theme }) => theme.primary[600]};
  width: 100%;
  height: 100%;
  max-width: ${yScale(60)}px;
  max-height: ${yScale(60)}px;
  justify-content: center;
  border-radius: 300px;
  top: -20px;
  align-items: center;
`;

export const TabBarActionIcon = styled(MotiImage)`
  width: 100%;
  height: 100%;
  max-width: ${yScale(35)}px;
  max-height: ${yScale(35)}px;
`;