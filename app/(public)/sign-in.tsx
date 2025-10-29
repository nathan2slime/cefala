import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { z } from "zod";
import { NavigationProp } from "@react-navigation/native";

import { Button } from "@/components/button";
import { TextField } from "@/components/input";
import { TypoGraphy } from "@/components/typography";
import { useSignIn } from "@/hooks/useSignIn";
import { themes } from "@/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { height, yScale } from "@/utils/design";
import { Space } from "@/components/space";
import { toast } from "@/components/toast";
import { Divider } from "@/components/divider";

const schema = z.object({
  email: z
    .email("Hmm... esse e-mail parece meio esquisito")
    .min(1, "Ei! Esqueceu de colocar seu e-mail"),
  password: z.string().min(1, "Ops! Coloca sua senha aí"),
});

type FormData = z.infer<typeof schema>;

const LoginScreen = () => {
  const router = useRouter();
  const { signInWithPassword, isLoaded } = useSignIn();
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
      await signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
    } catch {
      toast.open({
        message: "Credenciais inválidas",
        color: "danger",
      });
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
          <FormStyled>
            <View>
              <TypoGraphy.h1>Bem-vindo!</TypoGraphy.h1>

              <TypoGraphy.subtitle>
                Entre com seu e-mail e senha
              </TypoGraphy.subtitle>
            </View>

            <View>
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
                    invalid={!!errors.password}
                    message={errors.password?.message}
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
                  <TypoGraphy.button>Entrar</TypoGraphy.button>
                )}
              </Button>

              <Space y={15} />

              <Divider />

              <FooterStyled>
                <TypoGraphyStyled>Não tem uma conta?&nbsp;</TypoGraphyStyled>

                <TouchableOpacity
                  onPress={() => router.navigate("/(public)/sign-up")}
                >
                  <LinkStyled>Crie uma</LinkStyled>
                </TouchableOpacity>
              </FooterStyled>
            </View>
          </FormStyled>
        </Wrapper>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

export type FormStyledProps = {};

export type SigningProps = {
  navigation: NavigationProp<any, any>;
};

export const FormStyled = styled.View<FormStyledProps>`
  height: 100%;
  max-height: 65%;
  flex-direction: column;
  justify-content: space-between;

  background: ${({ theme }) => theme.background[100]};

  padding: ${yScale(25)}px;
  padding-top: ${yScale(40)}px;
`;

export const LinkStyled = styled(TypoGraphy.strong)`
  color: ${({ theme }) => theme.primary[200]};
`;

export const TypoGraphyStyled = styled(TypoGraphy.p)`
  color: ${({ theme }) => theme.text[100]};
`;

export const LinkOpacityStyled = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-end;
`;

export const FooterStyled = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: center;
  align-items: baseline;
`;

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  height: ${height}px;
  flex-direction: column;
  background: ${({ theme }) => theme.primary[100]};
  justify-content: flex-end;
`;
