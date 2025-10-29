import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export const Divider = () => {
  return (
    <Container>
      <Line />
      <Emoji>
      </Emoji>
      <Line />
    </Container>
  );
};

// 🌈 --- styled-components --- 🌈
const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 16px;
`;

const Emoji = styled.Text`
  margin-horizontal: 8px;
  font-size: 18px;
`;

const Line = styled(LinearGradient).attrs({
  colors: ["#ffb39aff", "#fad0c4", "#ebb364ff"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  height: 2px;
  border-radius: 50px;
  flex: 1;
`;
