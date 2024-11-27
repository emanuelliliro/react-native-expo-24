import { Stack, router } from "expo-router";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


const StackLayout = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.authenticated) {
            router.replace("signin");
            // router.push("maintenance"); 
        } else {
                router.replace("(protected)/geral");
        }

    }, [user]);

    return (
        <Stack>
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen
            name="entrarcomgoogle"
            options={{
                
                headerShown: true, // Mostra o cabeçalho
                headerTitle: "", // Remove o título
                headerLeft: () => (
                <TouchableOpacity onPress={() => router.back("/singin")}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                ),
            }}
            />
           <Stack.Screen name="maintenance" options={{ 
            headerTitle: "Manutenção",             
            headerTitleAlign: 'center',
            }} />

            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
    );
}
export default function Layout() {

    return (
        <AppProvider>
            <StackLayout />
        </AppProvider>
    );
}