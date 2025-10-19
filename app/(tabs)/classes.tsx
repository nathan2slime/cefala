import { Page } from "@/components/page";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";

import { useClass } from "@/hooks/useClass";
import { responsiveHeightPx } from "@/utils";

export default function ClassesScreen() {
  const { data, refreshing, onRefresh } = useClass();
  const theme = useTheme();

  return (
    <Page>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, gap: responsiveHeightPx(1) }}>
          {data.map((item) => (
            <Card
              key={item.id}
              mode="outlined"
              style={{
                marginBottom: responsiveHeightPx(12),
                borderRadius: responsiveHeightPx(16),
                borderColor: theme.colors.elevation.level2,
                backgroundColor: theme.colors.elevation.level4,
              }}
            >
              <Card.Title
                title={item.title}
                titleVariant="titleLarge"
                titleStyle={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                }}
                subtitle={`Criado em ${new Date(
                  item.created_at
                ).toLocaleDateString("pt-BR")}`}
                left={(props) => (
                  <Avatar.Text
                    {...props}
                    label={item.title?.[0] ?? "?"}
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                )}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="information-outline"
                    onPress={() => {}}
                  />
                )}
              />

              <Divider />

              <Card.Content style={{ marginTop: responsiveHeightPx(8) }}>
                <Text>
                  {item.description.length > 120
                    ? item.description.slice(0, 120) + "..."
                    : item.description}
                </Text>
              </Card.Content>

              <Card.Actions style={{ justifyContent: "flex-end" }}>
                <Button
                  mode="contained-tonal"
                  onPress={() => console.log("Ver mais", item.id)}
                  icon="arrow-right"
                >
                  Ver mais
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({});
