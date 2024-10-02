import { Text, View } from "react-native";

import { Banner } from "../../components/Banner";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
     
 <Banner />
    
     <View style={{ flex: 1,  alignItems: "center" }}>
     <Text> Home </Text>
     </View>
    </View>
  );
}
     