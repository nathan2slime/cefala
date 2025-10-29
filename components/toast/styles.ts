import styled from "styled-components/native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";

import { width, yScale } from "@/utils/design";
import { TypoGraphy } from "@/components/typography";

import { ToastOptions, ToastWrapperProps } from "./model";

export const WrapperStyled = styled.View<ToastWrapperProps>`
  position: absolute;
  width: ${width}px;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  right: ${yScale(25)}px;
  top: ${({ insets }) => insets.top + yScale(25)}px;
`;

export const HeaderStyled = styled.View<ToastOptions>`
  width: ${yScale(40)}px;
  height: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: ${yScale(2)}px;
  background: ${({ theme, color }) => theme.alerts[color][100]};
`;

export const ToastStyled = styled(MotiView)<ToastOptions>`
  height: ${yScale(56)}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: ${yScale(8)}px;
  padding-right: ${yScale(10)}px;

  overflow: hidden;
  background: ${({ theme }) => theme.background[200]};
  border-radius: ${yScale(12)}px;
`;

export const ToastTitle = styled(TypoGraphy.p)`
  color: ${({ theme }) => theme.text[200]};
`;

export const CloseStyled = styled(Ionicons)`
  font-size: ${yScale(24)}px;
  margin-left: ${yScale(10)}px;
  color: ${({ theme, color }) => theme.text[200]};
`;

export const IconStyled = styled(Ionicons)<ToastOptions>`
  font-size: ${yScale(19)}px;
  color: ${({ theme, color }) => theme.white};
`;
