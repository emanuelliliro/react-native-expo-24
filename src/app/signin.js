import { StatusBar } from 'expo-status-bar';
import { BackHandler, StyleSheet, TextInput, Text, View, Alert, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from "../hooks/Auth";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';

export default function App() {
  const { signIn } = useAuth();
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.cabecalhobotao}>
        <TouchableOpacity style={styles.sobrebotao} onPress={() => router.push("/about")}>
          <Text style={styles.sobretexto}>Sobre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sairbotao} onPress={() => BackHandler.exitApp()}>
          <Text style={styles.sairtexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.retangulo}>
       
        <View style={styles.inputContainer}>
          <Ionicons name="mail-open-outline" size={20} color="#000" />
          <TextInput
            style={styles.emailinput}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#000" />
          <TextInput
            style={styles.emailinput}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisibility}
          />
          <Ionicons
            name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#000"
            onPress={togglePasswordVisibility}
          />
        </View>

        
        <TouchableOpacity style={styles.entrarbotao} onPress={handleEntrarSuper}>
          <Text style={styles.entrartexto}>Entrar</Text>
        </TouchableOpacity>

       
        <TouchableOpacity style={styles.googlebotao} onPress={() => router.push("/entrarcomgoogle")}>
          <Text style={styles.googletexto}>Entrar com o Google</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.bdbotao} onPress={() => router.push("/maintenance")}>
          <Text style={styles.bdtexto}>Banco de Dados</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textoou}>
          <Text>Ou</Text>
        </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  cabecalhobotao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -90,
    paddingTop: 10,
    paddingBottom: 20,
  },
  retangulo: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: "95%",
    padding: 20,
    alignItems: 'center',
    shadowRadius: 4,
    elevation: 5,
  },
  imagem: {
    width: 113,
    height: 115,
    borderRadius: 10,
    marginTop: 23,
    marginBottom: 19,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 5,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  emailinput: {
    flex: 1,
    fontFamily: "OpenSansMedium",
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  entrarbotao: {
    width: "100%",
    height: 40,
    backgroundColor: '#007bfc',
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: 'center',
    marginTop: 40, 
    marginBottom: 30, 
  },
  entrartexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: "RobotoRegular",
  },
  googlebotao: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffff",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 7,
    alignItems: 'center',
    marginTop: 10,
  },
  googletexto: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: "RobotoRegular",
  },
  googleImage: {
    width: 20,
    height: 20,
    marginTop: 427,
    position: "absolute",
    left: 40,
    zIndex: 1,
  },
  sairbotao: {
    borderRadius: 10,
    backgroundColor: "#ac0c24",
    width: 70,
    height: 30,
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 6,
    marginTop: "-30%",
    marginLeft: "80%",
    position: "absolute",
  },
  sairtexto: {
    fontSize: 16,
    color: '#ffff',
    fontWeight: '600',
    fontFamily: "RobotoRegular",
    
  },
  bdbotao: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: "#C0C0C0",
  },
  bdtexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: "RobotoRegular",
  },
  
  sobrebotao: {
    borderRadius: 10,
    marginLeft: "60%",
    marginTop: "-32%",

  },
  sobretexto: {
    fontSize: 16,
    color: '#ac0c24',
    fontWeight: '600',
    fontFamily: "RobotoRegular",
    width: 50,
  },
  textoou: {
    marginTop: "-42%",
    position: "relative",
    alignItems: "center",
  },
});
