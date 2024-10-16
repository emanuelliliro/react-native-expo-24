import { StatusBar } from "expo-status-bar";
import {Alert, BackHandler,StyleSheet, Text,TextInput, View,} from "react-native";
import { useAuth } from "../hooks/Auth";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password });
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}> FlorArte`s </Text>

      <View style={styles.inputbox}>
        <Ionicons name="mail-open-outline" size={20} color="pink" />
        <TextInput
          style={styles.emailinput}
          placeholder="E-mail"
          placeholderTextColor="pink"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="pink" />
        <TextInput
          style={styles.emailinput}
          placeholder="Senha"
          placeholderTextColor="pink"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordVisibility}
        />
        <Ionicons
          name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="pink"
          onPress={togglePasswordVisibility}
        />
      </View>

    
      <TouchableOpacity onPress={handleEntrarSuper} style={styles.button}>
        <Text style={styles.textbutton}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("about")} style={styles.button}>
        <Text style={styles.textbutton}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => BackHandler.exitApp()} style={styles.button}>
        <Text style={styles.textbutton}>Sair</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
    color: "white",
  },
  inputbox: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    alignItems: "center",
  },
  emailinput: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 20,
    color: "green",
  },
  button: {
    width: "100%",
  },
});
