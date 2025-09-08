import { responsiveHeightPx } from "@/utils";

import { PropsWithChildren, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { setBackgroundColorAsync } from "expo-navigation-bar";

export const Page = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.primary);
    StatusBar.setBarStyle("dark-content");
    setBackgroundColorAsync(theme.colors.elevation.level1);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Surface
        elevation={1}
        style={{ flex: 1, padding: responsiveHeightPx(16) }}
      >
        {children}
      </Surface>
    </SafeAreaView>
  );
};
