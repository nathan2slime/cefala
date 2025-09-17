import { AuthContext } from "@/components/auth-provider";
import { Page } from "@/components/page";
import { supabase } from "@/supabase.config";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default function ClassesScreen() {
  const { session } = useContext(AuthContext);

  return (
    <Page>
      <Button mode="contained" onPress={() => supabase.auth.signOut()}>Classes Screen</Button>
      <Text variant="bodyMedium">Welcome, {JSON.stringify(session)}</Text>
    </Page>
  );
}

const styles = StyleSheet.create({});
