import { responsiveHeightPx } from "@/utils";
import Constants from "expo-constants";

import { PropsWithChildren, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { setBackgroundColorAsync } from "expo-navigation-bar";

export const Page = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const statusBarHeight = Constants.statusBarHeight;

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.primary);
    StatusBar.setBarStyle("dark-content");
    setBackgroundColorAsync(theme.colors.primary);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: statusBarHeight }}>
      <Surface
        elevation={1}
        style={{ flex: 1, padding: responsiveHeightPx(16) }}
      >
        {children}
      </Surface>
    </SafeAreaView>
  );
};
