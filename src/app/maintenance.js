import { router } from "expo-router";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useMaintenanceDatabase } from "../database/useMaintenanceDatabase";
import { TouchableOpacity } from "react-native";

export default function Maintenance() {
const { resetDatabase, importUsers, importPayments } = useMaintenanceDatabase();

    const handleReset = async () => 
        {
         
            try{
            // fazer a chamada do componente na função
            await resetDatabase();
            Alert.alert("Payments", "Banco de dados resetado com sucesso!",);
            } catch (error) {
                Alert.alert("Payments", "Erro ao resetar banco de dados: " + error.message,);
            }          
        }

    const handleImportUsers = async () => {
        try {
            await importUsers();
            Alert.alert("Usuários", "Usuários importados com sucesso! ");
        } catch (error) {
            Alert.alert("Usuários", "Erro ao importar usuários: " + error.message)
        }
    }

    const handleImportPayments = async () => {
        try {
            await importPayments();
            Alert.alert("Payments", "Pagamentos importados com sucesso! ");
        } catch (error) {
            Alert.alert("Payments", "Erro ao importar pagamentos: " + error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.windowTitle}>Manutenção do Banco </Text>
            <View style={styles.contentButtons}>
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Text style={styles.buttonText}>ZERAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleImportUsers}>
                    <Text style={styles.buttonText}>IMPORTAR USUÁRIOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleImportPayments}>
                    <Text style={styles.buttonText}>IMPORTAR PAGAMENTOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
windowTitle: {
    fontSize: 20,
    fontWeight: "bold",
},
//Botao
contentButtons: {
    gap: 10,
    marginVertical: 13,
},
button: {
    backgroundColor: "#A9A9A9", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
},
buttonText: {
    color: "#fff", 
    fontWeight: "600",
},
});