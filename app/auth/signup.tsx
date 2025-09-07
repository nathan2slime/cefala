import { useSnackbar } from "@/providers/snackbar";
import { supabase } from "@/supabase.config";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  HelperText,
  Surface,
  TextInput,
} from "react-native-paper";
import { z } from "zod";
import { styles } from "./login";
import { useRouter } from "expo-router";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const SignUpScreen = () => {
  const { showSnackbar } = useSnackbar();
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
    const { error, data } = await supabase.auth.signUp({
      options: {
        data: {
          name: payload.name,
          role: "student",
        },
      },
      email: payload.email,
      password: payload.password,
    }); 

    console.log(data);

    if (error) {
      console.log(error);
      
      showSnackbar("Algo deu errado", "Fechar");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
      </Appbar.Header>

      <Surface elevation={0} style={styles.page}>
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
                    onChangeText={onChange}
                    error={!!errors.name}
                    value={value}
                  />
                  {errors.name && (
                    <HelperText type="error">{errors.name.message}</HelperText>
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

export default SignUpScreen;
