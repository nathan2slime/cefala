import { Page } from "@/components/page";
import { useSupabase } from "@/hooks/useSupabase";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default function ClassesScreen() {
  const { session , signOut} = useSupabase();

  return (
    <Page>
      <Button
      onPress={() => signOut()}
        mode="contained"
      >
        Classes Screen
      </Button>
    </Page>
  );
}

const styles = StyleSheet.create({});
