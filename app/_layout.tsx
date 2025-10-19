import { useEffect } from "react";

import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

import { useSupabase } from "@/hooks/useSupabase";
import { SupabaseProvider } from "@/providers/supabase";

import {
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/nunito";

import { SnackbarProvider } from "@/providers/snackbar";
import { theme } from "@/themes";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

const appTheme = theme as ThemeProp;

export default function RootLayout() {
  return (
    <SnackbarProvider>
      <SupabaseProvider>
        <RootNavigator />
      </SupabaseProvider>
    </SnackbarProvider>
  );
}

function RootNavigator() {
  const { isLoaded, session } = useSupabase();
  const colorScheme = useColorScheme();

  const { theme } = useMaterial3Theme();
  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, ...appTheme, colors: theme.dark }
      : { ...MD3LightTheme, ...appTheme, colors: theme.light };

  const [loaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black,
    Nunito_900Black_Italic,
    Nunito_500Medium_Italic,
    Nunito_500Medium,
  });

  useEffect(() => {
    if (isLoaded && loaded) {
      SplashScreen.hide();
    }
  }, [isLoaded, session, loaded]);

  return (
    <PaperProvider theme={appTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="create-post"  options={{ presentation: "modal" }} />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen name="(public)" />
        </Stack.Protected>
      </Stack>
    </PaperProvider>
  );
}
