import { Text, View } from "react-native";

export default function List() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f2f1' }}>
            <Text style={{ fontSize: 24, fontWeight: '600', color: 'green' }}>Listagem</Text>
            <Text style={{ fontSize: 24, fontWeight: '600', color: 'green' }}></Text>
        </View>
    );
}
