import { responsiveHeightPx } from "@/utils";

import { PropsWithChildren, useEffect } from "react";
import { StatusBar } from "react-native";
import { Appbar, Surface, useTheme } from "react-native-paper";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = PropsWithChildren<
  Partial<{
    title: string;
    onClose: () => void;
  }>
>;

export const Page = ({ children, title, onClose }: Props) => {
  const theme = useTheme();

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.primary);
    StatusBar.setBarStyle("dark-content");
    setBackgroundColorAsync(theme.colors.elevation.level1);
  }, []);

  return (
    <>
      {title && (
        <Appbar.Header>
          <Appbar.Content title={title} />
          {onClose && <Appbar.Action icon="close" onPress={onClose} />}
        </Appbar.Header>
      )}
      <Surface style={{ flex: 1, padding: responsiveHeightPx(16) }}>
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </Surface>
    </>
  );
};
