import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const { signIn, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}> aplicativo pronto para usar</Text>
      <Button
        title="Signin Super"
        on
        Press={() =>
          signIn({ email: "super@email.com", password: "Super123!" })
        }
      />
      <Button
        title="Signin Adm"
        on
        Press={() =>
          signIn({ email: "adm@email.com", password: "Adm123!" })
        }
      />
      <Button
        title="Signin User"
        on
        Press={() =>
          signIn({ email: "user@email.com", password: "User123!" })
        }
      />
      <Button title="Signout" on Press={() => signOut} />

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "light",
    fontSize: 20,
  },
});
