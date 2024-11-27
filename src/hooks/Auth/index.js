import { createContext, useContext, useEffect, useState } from "react";
import { useUsersDatabase } from "../../database/useUsersDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";

const AuthContext = createContext({});

export const Role = {
    SUPER: "SUPER",
    ADM: "ADM",
    USER: "USER",
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState({ // usuario nulo
        authenticated: false,
        user: null,
        role: null,
    });

    const { authUser } = useUsersDatabase();

    useEffect(() => { //procura se ja tem um usuario cadastrado
        const loadStoragedData = async () => {
            const storagedUser = await AsyncStorage.getItem("@payment:user");

            if (storagedUser) {
                setUser({
                    authenticated: true,
                    user: JSON.parse(storagedUser), //user = usuario armazenado
                    role: JSON.parse(storagedUser).role, // role dele = role que esta ai 
                });
            } else {  // caso contrario
                setUser({
                    authenticated: false,
                    user: null,
                    role: null,
                });
            }
        };

        loadStoragedData();
    }, []);

    const signIn = async ({ email, password }) => {
        const response = await authUser({ email, password });
        if (!response) { //dados incorretos:
            setUser({
                authenticated: false,
                user: null,
                role: null,
            });
            throw new Error("Usuário ou senha inválidos.");
        }

        await AsyncStorage.setItem("@payment:user", JSON.stringify(response)); //transforma os dados em texto para gravar os dados

        setUser({ //dados certos:
            authenticated: true,
            user: response,
            role: response.role,
        });
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("@payment:user");
        setUser({
            authenticated: false,
            user: null,
            role: null,
        });
    };

    if (user?.authenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 28, marginTop: 15 }}>
                    Carregando Dados do Usuário
                </Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}