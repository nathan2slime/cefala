import { View } from "react-native";

import { xScale, yScale } from "@/utils/design";

export type SpaceProps = Partial<{
  x: number;
  y: number;
}>;

export const Space = ({ x = 0, y = 0 }: SpaceProps) => (
  <View style={{ width: xScale(x), height: yScale(y) }} />
);
