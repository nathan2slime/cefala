import { PropsWithChildren, useEffect } from "react";
import { StatusBar, View } from "react-native";
import { Appbar, Surface } from "react-native-paper";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { responsiveHeightPx } from "@/utils";

import { themes } from "@/themes";

type Props = PropsWithChildren<
  Partial<{
    title: string;
    onClose: () => void;
  }>
>;

export const Page = ({ children, title, onClose }: Props) => {
  useEffect(() => {
    StatusBar.setBackgroundColor(themes.light.primary[100]);
    StatusBar.setBarStyle("dark-content");
    setBackgroundColorAsync(themes.light.background[100]);
  }, []);

  return (
    <>
      {title && (
        <Appbar.Header>
          <Appbar.Content title={title} />
          {onClose && <Appbar.Action icon="close" onPress={onClose} />}
        </Appbar.Header>
      )}
      <View style={{ flex: 1, padding: responsiveHeightPx(16) }}>
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </View>
    </>
  );
};
