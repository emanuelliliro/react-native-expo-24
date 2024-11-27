import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, Alert, Switch } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import { useAuth } from '../hooks/Auth';

export default function Entrarcomgoogle() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("super@email.com");
    const [password, setPassword] = useState("A123456a!");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [erro, setErro ] = useState("");

    const togglePasswordVisibility = () => {
      setPasswordVisibility(!passwordVisibility);
    };
  
    const handleEntrarSuper = async () => {
      if (!isSelected) {
        Alert.alert("Erro", "Você precisa aceitar os termos e condições.");
        return;
      }
      try {
        await signIn({ email, password });
      } catch (error) {
        Alert.alert("Erro", error.message);
        console.log(error);
      }
    };

    return (
     
      <View style={styles.container}> 
        <View style={styles.retangulo}>
          
          <Text style={{ fontSize: 20, fontFamily: "RobotoMedium", color: '#000', marginTop: -45, marginBottom: 25 }}>
            Super
          </Text>
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
              secureTextEntry={passwordVisibility}
            />
            <Ionicons
              name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#000"
              onPress={togglePasswordVisibility}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Switch
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.textocheckbox}>
              Ao clicar em "Entrar", sua conta se conectará automaticamente com o aplicativo, passando suas informações pessoais para o cadastro do perfil  você aceita o termo?
            </Text>
          </View>

          <TouchableOpacity style={styles.entrarbotao} onPress={handleEntrarSuper}>
            <Text style={styles.entrartexto}>Entrar</Text>
          </TouchableOpacity>

          { erro &&  (
            <Text style={styles.erro}>{erro}</Text>
          )}
        </View>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffff', 
  },
  retangulo: {
    marginTop: "-3%",
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: "95%",
    height: "80%",
    padding: 20,
    alignItems: 'center',
    shadowRadius: 4,
    elevation: 5,
  },
  imagem: {
    width: 113,
    height: 115,
    borderRadius: 10,
    marginTop: 1,
    marginBottom: 43,
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
  },
  entrartexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: "RobotoRegular",
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: "-10%",
  },
  checkbox: {
    marginRight: 6,
  },
  textocheckbox: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'RobotoRegular',
    justifyContent: 'center',
    textAlign: 'justify',
    width: '70%',
    marginLeft: 10,
  },
  erro: {
    color: 'red',
    marginTop: 10,
  },
});
