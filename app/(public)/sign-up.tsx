import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, View, ScrollView } from "react-native";
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
import { useRouter } from "expo-router";

import { styles } from "./sign-in";
import { useSignUp } from "@/hooks/useSignup";

const schema = z.object({
  name: z.string({ error: "Nome é obrigatório" }).min(1, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

const SignUpScreen = () => {
  const theme = useTheme();
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

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
    if (!isLoaded) return;

    await signUp({
      isTeacher: false,
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });
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
          <View style={{ ...styles.thumb, height: "40%" }}></View>
          <View style={{ ...styles.container, height: "60%" }}>
            <Card.Title
              titleVariant="headlineLarge"
              title="Cadastro"
              subtitle="Preencha os campos para criar sua conta"
            />

            <View style={styles.wrapper}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="Nome Completo"
                      mode="outlined"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      maxLength={200}
                      onChangeText={onChange}
                      error={!!errors.name}
                      value={value}
                    />
                    {errors.name && (
                      <HelperText type="error">
                        {errors.name.message}
                      </HelperText>
                    )}
                  </View>
                )}
              />

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

export default SignUpScreen;
