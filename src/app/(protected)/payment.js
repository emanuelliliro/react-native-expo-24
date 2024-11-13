import { Button, StyleSheet, View,BackHandler  } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Payments() {
  const navigation = useNavigation(); 
  const [valor,setValor] = useState("0,00");
  const[sugestoes, setSugestoes] = useState([{
      "id": 1,
      "nome": "Dorian Lean"
    }, {
      "id": 2,
      "nome": "Kathy Pulbrook"
    }, {
      "id": 3,
      "nome": "Whitney Raccio"
    }, {
      "id": 4,
      "nome": "Marion Ambrus"
    }, {
      "id": 5,
      "nome": "Kelvin Curman"
    }, {
      "id": 6,
      "nome": "Con Vatcher"
    }, {
      "id": 7,
      "nome": "Malina Kurten"
    }, {
      "id": 8,
      "nome": "Casey Mc Queen"
    }, {
      "id": 9,
      "nome": "Kirbie Colbron"
    }, {
      "id": 10,
      "nome": "Dinny Such"
    }, {
      "id": 11,
      "nome": "Cullie Dionisetto"
    }, {
      "id": 12,
      "nome": "Gare McRonald"
    }, {
      "id": 13,
      "nome": "Iosep Clarycott"
    }, {
      "id": 14,
      "nome": "Bourke Youde"
    }, {
      "id": 15,
      "nome": "Jeannette Mont"
    }, {
      "id": 16,
      "nome": "Dewitt Gritten"
    }, {
      "id": 17,
      "nome": "Britni Harring"
    }, {
      "id": 18,
      "nome": "Meris Tite"
    }, {
      "id": 19,
      "nome": "Boniface Blackie"
    }, {
      "id": 20,
      "nome": "Cecil Bass"
    }, {
      "id": 21,
      "nome": "Bibbie Fegan"
    }, {
      "id": 22,
      "nome": "Sharai Pickover"
    }, {
      "id": 23,
      "nome": "Faina Meaddowcroft"
    }, {
      "id": 24,
      "nome": "Cassey Piris"
    }, {
      "id": 25,
      "nome": "Lilian Kerr"
    }, {
      "id": 26,
      "nome": "Elliot Saint"
    }, {
      "id": 27,
      "nome": "Amity Gudger"
    }, {
      "id": 28,
      "nome": "Vonny Cowwell"
    }, {
      "id": 29,
      "nome": "Domeniga Ceney"
    }, {
      "id": 30,
      "nome": "Melita Demangeot"
    }, {
      "id": 31,
      "nome": "Fallon Monkeman"
    }, {
      "id": 32,
      "nome": "Enrico Billyeald"
    }, {
      "id": 33,
      "nome": "Rudolph Taylor"
    }, {
      "id": 34,
      "nome": "Nicolina Spick"
    }, {
      "id": 35,
      "nome": "Justin Arenson"
    }
  ]);

  
  const handleSave = () => {
    // Aqui você pode processar as informações, como validar os campos ou enviá-los para uma API
    alert('Informações salvas');
  };
  <Button title="Salvar" onPress={handleSave} />  


const [id,setId] = useState(1);
const [data,setData] = =useState(new Date());
const [viewCalendar,setViewCalendar] = useState (false);
const handleCalendar = (event, selectedDate) => {
  setData(selectedDate);
  setViewCalendar(false);
}
const [observacao,setObservacao] = useState("");

return (
  <View style={styles.content}>
    <Text> inserir Pagamentos </Text>
    <View style={styles.inputView}>
    <Ionicons name="wallet-outline" size={24} color="black" /> 
<TextInput 
placeholder="Valor" 
keyboardType="decimal-pad"
 style={styles.inputValor}
 value={valor}
 onChangeText={setValor}
 />
    </View>
    <View style={styles.inputView}> 
          <Picker selectedValue={id} 
          onValueChange={(itemValue, index) => {
            setId(itemValue);
          }}
          style={{width: "100%"}}
          >  
          {sugestoes?.map((item) => {
            return(
            <Picker.Item key={item.id} label={item.nome} value={item.id} />
         );
          })}
           </Picker>                
    </View>
    <View style={styles.inputView}> 
    <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
       {data.toLocaleDateString().split("T")[0]}
        </Text>
      {viewCalendar && (
        <DateTimePicker value={data} onChange={handleCalendar} mode="date" textID="dateTimePicker" />  
     
      )}

    </View>
    <View style={styles.inputView}> 
<TextInput placeholder="Observacoes" style={styles.inputObservacao} value={observacao} onChangeText={setObservacao}
/>
    </View>
    <View style={styles.contentButtons}> 
<Button title="Salvar" />
<Button title="Continuar" />
<Button title="Cancelar" onPress={() =>navigation.goBack()} />
    </View>

  </View>
 );
}
const styles = StyleSheet.create({
content: {
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  padding:10,
},
inputView:{
  borderColor: 'black',
  borderWidth: 1,
  margin: 10,
  alighItems: "center",
  flexDirection: "row",
  padding: 10,
},
     contentButtons: {
      flex:1,
      
      gap: 10,
      justifyContent: "space-around",
     },
     inputValor: {
     textAlign: "right",
     padding: 10,
     },
     inputData: {
       width: "100%",
       textAlign: "center",
       fontFamily : "regular",
       fontSize: 20,
        padding: 10,
     },
     inputObservacao: {
      fontFamily : "regular",
      fontSize: 16,
      flex:1,
      lineHeight: 20,
   
});