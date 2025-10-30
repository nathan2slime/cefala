import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { Page } from "@/components/page";
import { yScale } from "@/utils/design";
import { TypoGraphy } from "@/components/typography";
import { Avatar, Chip } from "react-native-paper";
import { themes } from "@/themes";
import { TextField } from "@/components/input";
import { Space } from "@/components/space";
import { Button } from "@/components/button";
import { Divider } from "@/components/divider";

export default function AccountScreen() {
  const { session, signOut, updateUserName } = useSupabase();

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

  const email = session?.user?.email ?? "";
  const role = session?.user?.user_metadata?.role ?? "student";

  return (
    <Page>
      <View style={styles.header}>
        <Avatar.Icon
          size={80}
          icon="account"
          style={{
            backgroundColor: themes.light.background[200],
          }}
          color={themes.light.primary[100]}
        />

        <View style={styles.userInfo}>
          <TypoGraphy.h3 style={styles.name}>{name}</TypoGraphy.h3>
          <TypoGraphy.description>{email}</TypoGraphy.description>

          <Chip
            icon={role === "student" ? "school" : "briefcase"}
            style={{
              backgroundColor: themes.light.background[200],
              alignSelf: "flex-start",
              marginTop: yScale(6),
            }}
          >
            {role === "student" ? "Aluno" : "Profissional"}
          </Chip>
        </View>
      </View>

      <Space y={9} />
      <Divider />
      <Space y={9} />

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextField
            label="Nome Completo"
            value={tempName}
            maxLength={80}
            onChangeText={setTempName}
          />

          <Space y={12} />

          <View>
            <Button onPress={handleSave}>
              <TypoGraphy.button>Salvar</TypoGraphy.button>
            </Button>
            <Space y={7} />

            <Button variant="outline" onPress={handleCancel}>
              <TypoGraphy.button>Cancelar</TypoGraphy.button>
            </Button>
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "column",
            gap: yScale(6),
          }}
        >
          <Button variant="outline" onPress={() => setIsEditing(true)}>
            <TypoGraphy.button>Editar</TypoGraphy.button>
          </Button>

          <Button onPress={signOut}>
            <TypoGraphy.button>Sair</TypoGraphy.button>
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
    marginBottom: yScale(16),
  },
  userInfo: {
    flex: 1,
    marginLeft: yScale(16),
  },
  name: {
    fontWeight: "600",
    marginBottom: yScale(2),
  },
  email: {
    color: "gray",
  },
  editContainer: {
    marginTop: yScale(2),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
