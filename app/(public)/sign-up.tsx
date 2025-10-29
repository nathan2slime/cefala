import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { z } from "zod";
import { useRouter } from "expo-router";

import { useSignUp } from "@/hooks/useSignup";
import { useSnackbar } from "@/providers/snackbar";
import { Page } from "@/components/page";
import { FormStyled } from "./sign-in";
import { TextField } from "@/components/input";
import { Button } from "@/components/button";
import { TypoGraphy } from "@/components/typography";
import { themes } from "@/themes";

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
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();
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
    if (!isLoaded) return;

    try {
      await signUp({
        isTeacher: false,
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
    } catch {
      showSnackbar("Não foi possível criar a conta. Tente novamente.");
    }
  };

  return (
    <Page>
      <FormStyled>
        <View>
          <View>
            <TypoGraphy.h1>Login</TypoGraphy.h1>

            <TypoGraphy.subtitle>Preencha os campos abaixo</TypoGraphy.subtitle>
          </View>
          <View>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Nome Completo"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  maxLength={200}
                  onChangeText={onChange}
                  message={errors.name?.message}
                  invalid={!!errors.name}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="E-mail"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  invalid={!!errors.email}
                  message={errors.email?.message}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Senha"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  message={errors.password?.message}
                  invalid={!!errors.password}
                  value={value}
                />
              )}
            />
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <ActivityIndicator
                size="large"
                color={themes.light.primary[100]}
              />
            ) : (
              <TypoGraphy.button>ENTRAR</TypoGraphy.button>
            )}
          </Button>
        </View>
      </FormStyled>
    </Page>
  );
};

export default SignUpScreen;
