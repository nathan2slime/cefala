import { AuthContext } from "@/components/auth-provider";
import { Page } from "@/components/page";
import { format } from "date-fns";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { ptBR } from "date-fns/locale";

export default function ClassesScreen() {
  const { session } = useContext(AuthContext);

  const classes = [
    {
      id: 1,
      title: "Turma 01",
      createdAt: new Date(),
    },
  ];

  return (
    <Page>
      {/* <Button mode="contained" onPress={() => supabase.auth.signOut()}>
        Classes Screen
      </Button> */}
      <Text variant="bodyMedium">
        Welcome, {session?.user.user_metadata.name}
      </Text>

      {classes.map((classItem) => (
        <Card style={{borderRadius: 8}}>
          <Card.Content>
            <Text variant="titleMedium">{classItem.title}</Text>
            <Text variant="bodyMedium">
              {format(classItem.createdAt, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </Page>
  );
}

const styles = StyleSheet.create({});
