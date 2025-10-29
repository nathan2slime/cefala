import { useEffect } from "react";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

import { useSupabase } from "@/hooks/useSupabase";
import { SupabaseProvider } from "@/providers/supabase";

import {
  FontSource,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts,
} from "@expo-google-fonts/fredoka";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SnackbarProvider } from "@/providers/snackbar";
import { ThemeProvider } from "styled-components";
import { themes } from "@/themes";
import { Toast } from "@/components/toast";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";
import "react-native-gesture-handler";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

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

  const [loaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  useEffect(() => {
    if (isLoaded && loaded) {
      SplashScreen.hide();
    }
  }, [isLoaded, session, loaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={themes.light}>
        <PaperProvider theme={MD3LightTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Protected guard={!!session}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="create-post"
                options={{ presentation: "modal" }}
              />
            </Stack.Protected>

            <Stack.Protected guard={!session}>
              <Stack.Screen name="(public)" />
            </Stack.Protected>
          </Stack>
        </PaperProvider>

        <Toast />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
