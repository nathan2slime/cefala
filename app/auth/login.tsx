import { useSnackbar } from "@/providers/snackbar";
import { supabase } from "@/supabase.config";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  HelperText,
  Surface,
  TextInput,
} from "react-native-paper";
import { z } from "zod";

const schema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const LoginScreen = () => {
  const { showSnackbar } = useSnackbar();

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
    const { error, data } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    console.log(data);

    if (error) {
      showSnackbar("E-mail ou Senha inválidos", "Fechar");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <Surface elevation={0} style={styles.page}>
        <View style={styles.thumb}>
        </View>
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
                    <HelperText type="error">{errors.email.message}</HelperText>
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
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// --- Styles ---
const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  thumb: {
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    height: "60%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
    maxWidth: 500,
    flexShrink: 0,
    height: "40%",
  },
  wrapper: {
    flexDirection: "column",
    marginVertical: 25,
    paddingHorizontal: 15,
    gap: 6,
  },
  button: {
    marginTop: 12,
    marginBottom: 6,
    marginHorizontal: 15,
  },
});
