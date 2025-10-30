import { useRouter } from "expo-router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { responsiveHeightPx } from "@/utils";
import { Page } from "@/components/page";
import { TypoGraphy } from "@/components/typography";
import { Button } from "@/components/button";
import { Space } from "@/components/space";
import { themes } from "@/themes";

const AppIntroScreen = () => {
  const router = useRouter();

  return (
    <Page>
      <View style={styles.container}>
        <TypoGraphy.h1 style={styles.title}>
          Bem-vindo(a) ao Conectaê!
        </TypoGraphy.h1>
        <TypoGraphy.p style={styles.paragraph}>
          Feito especialmente para você, estudante do 1º ano do Ensino Médio,
          este é o seu espaço para viver novas experiências, se desafiar e
          crescer junto com a sua escola.
        </TypoGraphy.p>
        <TypoGraphy.strong style={styles.objective}>
          Preparado(a) pra começar essa jornada?
        </TypoGraphy.strong>
        <Space y={40} />

        <View style={styles.buttonw}>
          <Button onPress={() => router.navigate("/(public)/sign-up")}>
            <TypoGraphy.button>Cadastre-se</TypoGraphy.button>
          </Button>
          <Button
            variant="outline"
            onPress={() => router.navigate("/(public)/sign-in")}
          >
            <TypoGraphy.button>Entrar</TypoGraphy.button>
          </Button>
        </View>
      </View>
    </Page>
  );
};

export default AppIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    color: themes.light.primary[100],
    marginBottom: responsiveHeightPx(20),
  },
  paragraph: {
    textAlign: "center",
    marginBottom: responsiveHeightPx(20),
  },
  objective: {
    textAlign: "center",
    marginBottom: responsiveHeightPx(32),
  },
  buttonw: {
    width: "100%",
    gap: responsiveHeightPx(12),
  },
});
