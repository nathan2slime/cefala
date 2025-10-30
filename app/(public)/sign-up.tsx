import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
import { useRouter } from "expo-router";

import { useSignUp } from "@/hooks/useSignup";
import { useSnackbar } from "@/providers/snackbar";
import { Page } from "@/components/page";
import {
  FooterStyled,
  FormStyled,
  LinkStyled,
  TypoGraphyStyled,
  Wrapper,
} from "./sign-in";
import { TextField } from "@/components/input";
import { Button } from "@/components/button";
import { TypoGraphy } from "@/components/typography";
import { themes } from "@/themes";
import { Space } from "@/components/space";
import { Divider } from "@/components/divider";

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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: themes.light.background[100] }}
      behavior="position"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Wrapper>
          <FormStyled style={{ maxHeight: "80%" }}>
            <View>
              <TypoGraphy.h1>Cadastro</TypoGraphy.h1>

              <TypoGraphy.subtitle>
                Preencha os campos abaixo
              </TypoGraphy.subtitle>
            </View>

            <Space y={25} />

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

              <Space y={15} />

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

              <Space y={15} />

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

            <View>
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

              <Space y={15} />

              <Divider />

              <FooterStyled>
                <TypoGraphyStyled>Já tem uma conta?&nbsp;</TypoGraphyStyled>

                <TouchableOpacity
                  onPress={() => router.navigate("/(public)/sign-in")}
                >
                  <LinkStyled>Entre</LinkStyled>
                </TouchableOpacity>
              </FooterStyled>
            </View>
          </FormStyled>
        </Wrapper>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
