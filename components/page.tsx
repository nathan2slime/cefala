import { responsiveHeightPx } from "@/utils";

import { PropsWithChildren, useEffect } from "react";
import { StatusBar } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export const Page = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.primary);
    StatusBar.setBarStyle("dark-content");
    setBackgroundColorAsync(theme.colors.elevation.level1);
  }, []);

  return (
    <Surface style={{ flex: 1, padding: responsiveHeightPx(16) }}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </Surface>
  );
};
