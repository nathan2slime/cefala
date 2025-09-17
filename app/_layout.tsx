import { AuthContext } from "@/components/auth-provider";
import { SnackbarProvider } from "@/providers/snackbar";
import { supabase } from "@/supabase.config";
import { StatusBar, useColorScheme } from "react-native";
import { theme } from "@/themes";
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
} from "@expo-google-fonts/nunito";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useState, useMemo, useEffect } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { setBackgroundColorAsync } from "expo-navigation-bar";

import "react-native-reanimated";

const appTheme = theme as ThemeProp;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

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

  const auth = useMemo(() => ({ session, setSession }), [session, setSession]);

  const onLoadSession = async () => {
    StatusBar.setBackgroundColor(paperTheme.colors.primary);
    StatusBar.setBarStyle("dark-content");
    await setBackgroundColorAsync(paperTheme.colors.elevation.level1);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);
    if (session) {
      router.replace("/(tabs)");
    } else {
      router.replace("/start");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    onLoadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session && event === "SIGNED_OUT") {
          router.replace("/start");
        }

        if (event === "SIGNED_IN") {
          router.replace("/(tabs)");
        }

        setSession(session);

        setIsLoading(false);
        SplashScreen.hide();
      }
    );

    return () => {
      if (listener) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  if (!loaded || isLoading) return null;

  return (
    <AuthContext.Provider value={auth}>
      <PaperProvider theme={paperTheme as ThemeProp}>
        <SnackbarProvider>
          <Stack
            initialRouteName="start"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Protected guard={!!session}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack.Protected>

            <Stack.Screen name="+not-found" />
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/signup" />
            <Stack.Screen name="start" />
          </Stack>
        </SnackbarProvider>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
