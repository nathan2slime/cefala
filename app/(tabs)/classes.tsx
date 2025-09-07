import { AuthContext } from "@/components/auth-provider";
import { Page } from "@/components/page";
import { supabase } from "@/supabase.config";
import { responsiveHeightPx } from "@/utils";
import { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

export default function ClassesScreen() {
  const { session } = useContext(AuthContext);

  return (
    <Page>
      <Button mode="contained" onPress={() => supabase.auth.signOut()}>Classes Screen</Button>
      <Text variant="bodyMedium">Welcome, {session?.user.email}</Text>
    </Page>
  );
}

const styles = StyleSheet.create({});
