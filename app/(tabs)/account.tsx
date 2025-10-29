import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  useTheme,
  Chip,
} from "react-native-paper";
import { useEffect, useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { Page } from "@/components/page";

export default function AccountScreen() {
  const { session, signOut, updateUserName } = useSupabase();
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string>(
    () => session?.user?.user_metadata?.name || "Usuário"
  );
  const [tempName, setTempName] = useState<string>(name);

  useEffect(() => {
    const initial = session?.user?.user_metadata?.name || "Usuário";
    setName(initial);
    setTempName(initial);
  }, [session?.user?.user_metadata?.name]);

  const handleSave = async () => {
    setName(tempName);
    updateUserName(tempName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(name);
    setIsEditing(false);
  };

  if (!session) {
    return (
      <Page>
        <Text>Carregando...</Text>
      </Page>
    );
  }

  const email = session.user?.email ?? "";
  const role = session.user?.user_metadata?.role ?? "student";

  return (
    <Page>
      <View style={styles.header}>
        <Avatar.Icon
          size={80}
          icon="account"
          style={{
            backgroundColor: theme.colors.primaryContainer,
          }}
          color={theme.colors.onPrimaryContainer}
        />

        <View style={styles.userInfo}>
          <Text variant="titleLarge" style={styles.name}>
            {name}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {email}
          </Text>

          <Chip
            icon={role === "student" ? "school" : "briefcase"}
            style={{
              backgroundColor: theme.colors.secondaryContainer,
              alignSelf: "flex-start",
              marginTop: 6,
            }}
          >
            {role === "student" ? "Aluno" : "Profissional"}
          </Chip>
        </View>
      </View>

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            label="Nome completo"
            value={tempName}
            onChangeText={setTempName}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          <View style={styles.row}>
            <Button
              mode="contained"
              onPress={handleSave}
              style={{ flex: 1, marginRight: 8 }}
            >
              Salvar
            </Button>

            <Button mode="outlined" onPress={handleCancel} style={{ flex: 1 }}>
              Cancelar
            </Button>
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Button
            mode="outlined"
            onPress={() => setIsEditing(true)}
            style={{
              borderColor: theme.colors.primary,
            }}
            icon="pencil"
          >
            Editar Nome
          </Button>

          <Button
            mode="contained"
            onPress={signOut}
            style={{ backgroundColor: theme.colors.primary }}
            icon="logout"
          >
            Sair
          </Button>
        </View>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontWeight: "600",
    marginBottom: 2,
  },
  email: {
    color: "gray",
  },
  editContainer: {
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
