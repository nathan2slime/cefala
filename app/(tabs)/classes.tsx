import { useClassQuery } from "@/api/queries/get-class";
import { AuthContext } from "@/components/auth-provider";
import { Page } from "@/components/page";
import { supabase } from "@/supabase.config";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function ClassesScreen() {
  const { session } = useContext(AuthContext);

  const { data: classes } = useClassQuery();
  console.log(classes);

  if (!classes) {
    return (
      <Page>
        <Text>Carregando...</Text>
      </Page>
    );
  }

  return (
    <Page>
      <Button mode="contained" onPress={() => supabase.auth.signOut()}>
        Classes Screen
      </Button>
      <Text variant="bodyMedium">
        Welcome, {session?.user.user_metadata.name}
      </Text>

      {classes.map((classItem) => (
        <Card key={classItem.id} style={{ borderRadius: 8 }}>
          <Card.Content>
            <Text variant="titleMedium">{classItem.title}</Text>
            <Text variant="bodyMedium">
              {format(classItem.createdAt, "EEEE, dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </Page>
  );
}

const styles = StyleSheet.create({});
