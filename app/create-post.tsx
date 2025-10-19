import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Modal,
  FAB,
  Button,
  TextInput,
  Text,
  Divider,
  Appbar,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Smile, Frown, Meh, Angry, HelpCircle } from "lucide-react-native";
import { Page } from "@/components/page";
import { useRouter } from "expo-router";
import { responsiveHeightPx } from "@/utils";
import { useSupabase } from "@/hooks/useSupabase";
import { useSnackbar } from "@/providers/snackbar";

const postSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  content: z.string().min(10, "Conteúdo deve ter pelo menos 10 caracteres"),
  sentiment: z.enum(["happy", "sad", "neutral", "angry", "anxious"]),
});

type PostFormData = z.infer<typeof postSchema>;

type SentimentIconProps = {
  type: string;
  size?: number;
};

const SentimentIcon = ({ type, size = 24 }: SentimentIconProps) => {
  switch (type) {
    case "happy":
      return <Smile size={size} color="#FFD54F" />;
    case "sad":
      return <Frown size={size} color="#64B5F6" />;
    case "neutral":
      return <Meh size={size} color="#A0A0A0" />;
    case "angry":
      return <Angry size={size} color="#E57373" />;
    case "anxious":
      return <HelpCircle size={size} color="#81C784" />;
    default:
      return <Meh size={size} color="#BDBDBD" />;
  }
};

const CreatePost = () => {
  const { supabase } = useSupabase();
  const { showSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      sentiment: "neutral",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: PostFormData) => {
    try {
      await supabase.from("posts").insert({
        title: data.title,
        content: data.content,
        sentiment: data.sentiment,
      });

      reset();
      router.back();
    } catch {
      showSnackbar("Não foi possível publicar. Tente novamente.");
    }
  };

  return (
    <Page title="Novo Diário" onClose={() => router.back()}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Título"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            error={!!errors.title}
          />
        )}
      />
      {errors.title && (
        <Text style={{ color: "red" }}>{errors.title.message}</Text>
      )}

      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Conteúdo"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            multiline
            numberOfLines={5}
            style={{ marginTop: 12 }}
            error={!!errors.content}
          />
        )}
      />
      {errors.content && (
        <Text style={{ color: "red" }}>{errors.content.message}</Text>
      )}

      <Divider style={{ marginVertical: 16 }} />

      <Text style={{ marginBottom: 8 }}>Como você está se sentindo?</Text>

      <Controller
        control={control}
        name="sentiment"
        render={({ field: { onChange, value } }) => (
          <>
            <SegmentedButtons
              value={value}
              density="small"
              onValueChange={onChange}
              buttons={[
                {
                  value: "happy",
                  label: "Feliz",
                  icon: () => <SentimentIcon type="happy" />,
                },
                {
                  value: "sad",
                  label: "Triste",
                  icon: () => <SentimentIcon type="sad" />,
                },
                {
                  value: "neutral",
                  label: "Neutro",
                  icon: () => <SentimentIcon type="neutral" />,
                },
              ]}
            />

            <View style={{ height: responsiveHeightPx(4) }} />

            <SegmentedButtons
              value={value}
              density="small"
              onValueChange={onChange}
              buttons={[
                {
                  value: "angry",
                  label: "Bravo",
                  icon: () => <SentimentIcon type="angry" />,
                },
                {
                  value: "anxious",
                  label: "Ansioso",
                  icon: () => <SentimentIcon type="anxious" />,
                },
                {
                  value: "neutral",
                  label: "Neutro",
                  icon: () => <SentimentIcon type="neutral" />,
                },
              ]}
            />
          </>
        )}
      />

      {errors.sentiment && (
        <Text style={{ color: "red" }}>{errors.sentiment.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 24 }}
      >
        Publicar
      </Button>
    </Page>
  );
};

export default CreatePost;
