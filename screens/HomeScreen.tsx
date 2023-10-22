import { Button, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <View>
        <Text>Ola </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021F3A",
  },
});
