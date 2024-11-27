import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Text,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableOpacity,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from "../../hooks/Auth/index";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useUsersDatabase } from "../../database/useUsersDatabase";

import { z } from "zod";

const paymentSchema = z.object({
    valor_pago: z.number().gt(0),
    user_id: z.number().int().positive(),
    user_cadastro: z.number().int().positive(),
    data_pagamento: z.string().datetime(),
    numero_recibo: z.string(),
    observacao: z.string().optional(),
});

export default function Payment() {
    const [valor, setValor] = useState("0,00");
    const [sugestoes, setSugestoes] = useState([]);
    const [id, setId] = useState(1);
    const [data, setData] = useState(new Date());
    const [viewCalendar, setViewCalendar] = useState(false);
    const [observacao, setObservacao] = useState("");
    const [numeroRecibo, setNumeroRecibo] = useState("");
    const valueRef = useRef();
    const { user } = useAuth();
    const { createPayment } = usePaymentsDatabase();
    const { getAllUsers } = useUsersDatabase();

    useEffect(() => {
        (async () => {
            valueRef?.current?.focus();
            try {
                const users = await getAllUsers();
                console.log("Usuários carregados:", users); // Verificação dos dados
                setSugestoes(users);
                setId(users[0]?.id || 1); // Define um ID padrão
            } catch (error) {
                console.log("Erro ao carregar usuários:", error);
            }
        })();
    }, []);

    const handleCalendar = (event, selectedDate) => {
        setViewCalendar(false);
        if (selectedDate) setData(selectedDate);
    };

    const handleSubmit = async () => {
        const payment = {
            user_id: id,
            user_cadastro: Number(user.user.id),
            valor_pago: parseFloat(valor.replace(",", ".")),
            data_pagamento: data.toISOString(),
            numero_recibo: numeroRecibo,
            observacao,
        };

        try {
            await paymentSchema.parseAsync(payment);
            await createPayment(payment);
            Alert.alert("Sucesso", "Pagamento registrado com sucesso!");
            setValor("0,00");
            setObservacao("");
            setNumeroRecibo("");
            valueRef?.current?.focus();
        } catch (error) {
            Alert.alert("Erro", `Erro ao inserir pagamento: ${error.message}`);
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.containerprincipal}>
                <Text style={styles.titulo}>Dados do pagamento</Text>

                <View style={styles.inputView}>
                    <Ionicons name="wallet-outline" size={23} color="#777" />
                    <TextInput
                        placeholder="Valor"
                        keyboardType="decimal-pad"
                        style={styles.inputValor}
                        value={valor}
                        onChangeText={(text) => setValor(text)}
                        ref={valueRef}
                    />
                </View>

                <View style={styles.inputView}>
                    <Ionicons name="cash-outline" size={23} color="#777" />
                    <TextInput
                        placeholder="Número do Recibo"
                        keyboardType="default"
                        style={styles.inputrecibo}
                        value={numeroRecibo}
                        onChangeText={setNumeroRecibo}
                    />
                </View>

                <View style={styles.inputView}>
                    <Ionicons name="person-outline" size={23} color="#777" />
                    <Picker
                        selectedValue={id}
                        onValueChange={(itemValue) => setId(itemValue)}
                        style={styles.picker}
                    >
                        {sugestoes.length === 0 ? (
                            <Picker.Item label="Nenhum usuário disponível" value={0} />
                        ) : (
                            sugestoes.map((user) => (
                                <Picker.Item key={user.id} label={user.nome} value={user.id} />
                            ))
                        )}
                    </Picker>
                </View>

                <View style={styles.inputView}>
                    <MaterialCommunityIcons name="calendar-month" size={23} color="#777" />
                    <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
                        {data.toLocaleDateString()}
                    </Text>
                    {viewCalendar && (
                        <DateTimePicker
                            value={data}
                            onChange={handleCalendar}
                            mode="date"
                        />
                    )}
                </View>

                <View style={styles.inputView}>
                    <MaterialCommunityIcons name="message-badge-outline" size={24} color="#777" />
                    <TextInput
                        placeholder="Observações"
                        style={styles.inputObservacao}
                        value={observacao}
                        onChangeText={setObservacao}
                        multiline={true}
                    />
                </View>

                <View style={styles.botaoContainer}>
                    <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                        <Text style={styles.textobotao}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
                        <Text style={styles.textobotao}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,        
        alignItems: "center",
        textAlign: 'center',

    },
    titulo: {
        fontFamily: 'MontserratRegular',
        fontSize: 24,
        color: '#444',
        marginBottom: 15,
        textAlign: 'center',
    },
    containerprincipal: {
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
        marginTop: "20%",
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    inputValor: {
        flex: 1,
        fontSize: 17,
        color: '#555',
        textAlign: "right",
        marginLeft: 10,
    },
    inputrecibo: {
        flex: 1,
        fontSize: 17,
        color: '#555',
        textAlign: "right",
        marginLeft: 10,
    },
    inputData: {
        flex: 1,
        fontSize: 17,
        color: '#555',
        paddingLeft: 10,
    },
    inputObservacao: {
        flex: 1,
        fontSize: 17,
        color: '#666',
        paddingLeft: 10,
        lineHeight: 22,
    },
    picker: {
        flex: 1,
        fontSize: 17,
        color: '#333',
    },
    botaoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    botao: {
        backgroundColor: '#6a5acd',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '48%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    textobotao: {
        color: '#ffffff',
        fontFamily: 'OpenSansMedium',
        fontSize: 16,
    },
});
