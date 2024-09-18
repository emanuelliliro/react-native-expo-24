import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function About () {
    return (
        <View style={{ flex: 1, justfyContent: "center", alightItems: "center" }}>
                <Text> Sobre </Text>
                <Button title="Voltar" onPress={() => {router.replace("/")}} />
        </View>
    )
}