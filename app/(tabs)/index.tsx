import { Page } from "@/components/page";
import { useSupabase } from "@/hooks/useSupabase";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { Space } from "@/components/space";
import { Button } from "@/components/button";
import { TypoGraphy } from "@/components/typography";

export default function HomeScreen() {
  const { supabase } = useSupabase();

  return (
    <Page>
      <View style={styles.container}>
        <Link href="/questionnaire" asChild>
          <Button>
            <TypoGraphy.button>Go to Questionnaire</TypoGraphy.button>
          </Button>
  git       </Link>
        <Button
          onPress={() => {
            supabase.auth.signOut();
          }}
        >
          <TypoGraphy.button>Sair</TypoGraphy.button>
        </Button>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5
  },
});
