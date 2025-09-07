import { DefaultTheme } from "react-native-paper";

export const theme = {
  roundness: 20,
  fonts: {
    ...DefaultTheme.fonts,
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: "Nunito_600SemiBold",
      fontWeight: "600",
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: "Nunito_400Regular",
      fontWeight: "400",
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: "Nunito_400Regular",
      fontWeight: "400",
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: "Nunito_300Light",
      fontWeight: "300",
    },
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge,
      fontFamily: "Nunito_600SemiBold",
      fontWeight: "600",
    },
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: "Nunito_600SemiBold",
      fontWeight: "600",
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: "Nunito_600SemiBold",
      fontWeight: "600",
    },
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: "Nunito_700Bold",
      fontWeight: "700",
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: "Nunito_700Bold",
      fontWeight: "700",
    },
    displaySmall: {
      ...DefaultTheme.fonts.displaySmall,
      fontFamily: "Nunito_800ExtraBold",
      fontWeight: "800",
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: "Nunito_700Bold",
      fontWeight: "700",
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: "Nunito_700Bold",
      fontWeight: "700",
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: "Nunito_600SemiBold",
      fontWeight: "600",
    },
  },
};
