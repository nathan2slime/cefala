import { Page } from "@/components/page";
import { useSupabase } from "@/hooks/useSupabase";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const { supabase } = useSupabase();

  return (
    <Page>
      <Button
        mode="contained"
        onPress={() => {
          supabase.auth.signOut();
        }}
      >
        Sair
      </Button>
    </Page>
  );
}

const styles = StyleSheet.create({});
