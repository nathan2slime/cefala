import { FlatList, RefreshControl, View } from "react-native";
import {
  Card,
  Paragraph,
  ActivityIndicator,
  useTheme,
  Avatar,
  Text,
  FAB,
} from "react-native-paper";
import {
  Calendar,
  Frown,
  Meh,
  Smile,
  Angry,
  HelpCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";

import { usePosts } from "@/hooks/usePosts";
import { Page } from "@/components/page";
import { responsiveHeightPx } from "@/utils";

export default function DiaryScreen() {
  const { posts, loading, refreshPosts, refreshing } = usePosts();
  const theme = useTheme();
  const router = useRouter();

  const getSentimentIcon = (sentiment: string) => {
    const iconSize = 28;
    switch (sentiment) {
      case "happy":
        return <Smile size={iconSize} color="#FFD54F" />;
      case "sad":
        return <Frown size={iconSize} color="#64B5F6" />;
      case "neutral":
        return <Meh size={iconSize} color="#A0A0A0" />;
      case "angry":
        return <Angry size={iconSize} color="#E57373" />;
      case "anxious":
        return <HelpCircle size={iconSize} color="#81C784" />;
      default:
        return <Meh size={iconSize} color="#BDBDBD" />;
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        animating={true}
        style={{ marginTop: responsiveHeightPx(50) }}
      />
    );

  return (
    <Page>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPosts} />
        }
        contentContainerStyle={{ padding: responsiveHeightPx(10) }}
        renderItem={({ item }) => (
          <Card
            style={{
              marginVertical: responsiveHeightPx(8),
              borderRadius: 16,
              backgroundColor: theme.colors.elevation.level1,
            }}
          >
            <Card.Title
              title={item.title}
              titleStyle={{ fontWeight: "bold" }}
              left={() => (
                <Avatar.Icon
                  size={responsiveHeightPx(42)}
                  icon={() => getSentimentIcon(item.sentiment)}
                  style={{ backgroundColor: theme.colors.elevation.level4 }}
                />
              )}
            />
            <Card.Content>
              <Text
                style={{ fontSize: responsiveHeightPx(16), marginBottom: 10 }}
              >
                {item.content}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: responsiveHeightPx(5),
                }}
              >
                <Calendar
                  size={responsiveHeightPx(14)}
                  color={theme.colors.primary}
                />
                <Paragraph
                  style={{
                    fontSize: responsiveHeightPx(12),
                    marginLeft: responsiveHeightPx(5),
                  }}
                >
                  {new Date(item.created_at).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <View
            style={{
              marginTop: responsiveHeightPx(80),
              alignItems: "center",
            }}
          >
            <Avatar.Icon
              size={130}
              icon="book-outline"
              style={{
                backgroundColor: theme.colors.elevation.level2,
                marginBottom: responsiveHeightPx(20),
              }}
            />
            <Paragraph
              style={{
                textAlign: "center",
                fontSize: responsiveHeightPx(14),
              }}
            >
              Escreva sobre seus pensamentos e emoções do dia a dia para
              acompanhar seu progresso e bem-estar ao longo do tempo.
            </Paragraph>
          </View>
        }
      />
      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onPress={() => router.push("/create-post")}
      />
    </Page>
  );
}
