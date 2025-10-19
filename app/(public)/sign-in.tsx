import { useSignIn } from "@/hooks/useSignIn";
import { useSnackbar } from "@/providers/snackbar";
import { responsiveHeightPx } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Appbar,
  Button,
  Card,
  HelperText,
  Surface,
  TextInput,
  useTheme,
} from "react-native-paper";
import { z } from "zod";

const schema = z.object({
  email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const LoginScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { signInWithPassword, isLoaded } = useSignIn()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (payload: FormData) => {
    if(!isLoaded) return;

    try {
      await signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    } catch {
      showSnackbar("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.elevation.level1 }}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
        </Appbar.Header>

        <Surface elevation={1} style={styles.page}>
          <View style={styles.thumb}></View>
          <View style={styles.container}>
            <Card.Title
              titleVariant="headlineLarge"
              title="Login"
              subtitle="Entre com seu e-mail e senha"
            />

            <View style={styles.wrapper}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="E-mail"
                      mode="outlined"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={!!errors.email}
                      value={value}
                    />
                    {errors.email && (
                      <HelperText type="error">
                        {errors.email.message}
                      </HelperText>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="Senha"
                      mode="outlined"
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={!!errors.password}
                      value={value}
                    />
                    {errors.password && (
                      <HelperText type="error">
                        {errors.password.message}
                      </HelperText>
                    )}
                  </View>
                )}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              disabled={isSubmitting || !isValid}
              style={styles.button}
            >
              ENTRAR
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// --- Styles ---
export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  thumb: {
    height: "55%",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: responsiveHeightPx(16),
    paddingVertical: responsiveHeightPx(15),
    paddingBottom: responsiveHeightPx(25),
    maxWidth: 500,
    flexShrink: 0,
    height: "45%",
  },
  wrapper: {
    flexDirection: "column",
    marginVertical: responsiveHeightPx(25),
    paddingHorizontal: responsiveHeightPx(15),
    gap: responsiveHeightPx(6),
  },
  button: {
    marginTop: responsiveHeightPx(8),
    marginBottom: responsiveHeightPx(14),
    marginHorizontal: responsiveHeightPx(15),
  },
});
