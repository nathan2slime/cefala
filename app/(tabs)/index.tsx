import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function HomeScreen() {

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({});
