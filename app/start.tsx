import { useRouter } from "expo-router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { responsiveHeightPx } from "@/utils";
import { Page } from "@/components/page";

const AppIntroScreen = () => {
  const router = useRouter();

  return (
    <Page >
      <View style={styles.container}>

      <Text variant="titleLarge" style={styles.title}>
        CÊFALA – SUA VOZ. SEU ESPAÇO. SUA ESCOLA
      </Text>
      <Text style={styles.objective}>
        Nosso objetivo é oferecer a você, estudante de Caxias – Maranhão, um aplicativo educacional seguro,
        acolhedor e interativo. Aqui, você pode se expressar, refletir e se
        conectar facilmente com o setor de Psicologia da escola.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.navigate("/auth/signup")}
        >
          Cadastre-se
        </Button>
        <Button mode="outlined" onPress={() => router.navigate("/auth/login")}>
          Entrar
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
    marginBottom: responsiveHeightPx(12),
  },
  paragraph: {
    textAlign: "center",
    marginBottom: responsiveHeightPx(16),
  },
  objective: {
    fontSize: responsiveHeightPx(14),
    textAlign: "center",
    marginBottom: responsiveHeightPx(32),
  },
  buttonContainer: {
    width: "100%",
    gap: responsiveHeightPx(12),
  },
  button: {
    marginVertical: responsiveHeightPx(6),
  },
});
