import { router } from "expo-router";
import { Button, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

export default function About() {
    return (
        <View style={styles.container}>

           

            <Text style={styles.titulo}>
                SEJA BEM-VINDO!
            </Text>

            <View style={styles.retangulo}>
                <Text style={styles.frase}>
                    O aplicativo Cabanni traz uma seleção exclusiva que aprimora a experiência de cuidado pessoal.
                </Text>
            </View>

            <View style={styles.subtextocontainer}>
                <Text style={styles.subtexto}>
                O que você encontrará :
                </Text>
                {/* tópico 1 */}
                <Entypo name="check" size={22} color="#ac0c24" />
                <Text style={styles.topico1}>
                Hidratantes Premium para a sua Pele
                </Text>
                {/* tópico 2 */}
                <Entypo name="check" size={22} color="#ac0c24" />
                <Text style={styles.topico2}>
                Sabonetes Líquidos Exclusivos
                </Text>
                <Entypo name="check" size={22} color="#ac0c24" />
                <Text style={styles.topico2}>
                Perfumes com fragrâncias marcantes
                </Text>
                {/* tópico 3 */}
                <Entypo name="check" size={22} color="#ac0c24" />
                <Text style={styles.topico3}>
                Promoções imperdíveis
                </Text>
                
            </View>

            <TouchableOpacity style={styles.button} onPress={() => { router.replace("signin") }}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 470,
        height: 270,
        resizeMode: 'contain',
        marginTop: "-1%",
    },
    titulo: {
        fontSize: 21,
        fontWeight: "700",
        fontFamily: "RobotoRegular",
        color: "black",
        textAlign: "left", 
        alignSelf: 'flex-start', 
        marginHorizontal: "5%", 
        marginVertical: "-1%",
        marginTop: "8%",
    },
    retangulo: {
        padding: 10,
        borderRadius: 15,
        margin: "4%",
        backgroundColor: "#d6afaf",
        alignItems: 'center',
    },
    frase: {
        fontSize: 19,
        fontFamily: "RobotoRegular",
        color: "#fff",
        textAlign: "left", 
        
    },
    subtextocontainer: {
        textAlign: "left", 
        alignSelf: 'flex-start', 
        marginHorizontal: "6%", 
        marginVertical: "1%",
        marginTop: "-2%",
    },
    subtexto: {
        fontSize: 20,
        fontFamily: "RobotoRegular",
        color: "black",
        marginTop: "12%",
        marginBottom: "9%",
        
    },
    topico1: {
        fontSize: 18,
        fontFamily: "RobotoRegular",
        color: "black",
        marginTop: "-8%",
        marginLeft: "9%",
        marginBottom: "3%",
    },
    topico2: {
        fontSize: 18,
        fontFamily: "RobotoRegular",
        color: "black",
        marginTop: "-8%",
        marginLeft: "9%",
        marginBottom: "3%",
    },
    topico3: {
        fontSize: 18,
        fontFamily: "RobotoRegular",
        color: "black",
        marginTop: "-8%",
        marginLeft: "9%",
        marginBottom: "7%",
    },
    button: {
        backgroundColor: '#ac0c24', 
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: "RobotoMedium",
    },
});
