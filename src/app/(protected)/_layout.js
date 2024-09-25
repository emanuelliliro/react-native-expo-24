import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {DrawerContentScrollView,DrawerItemList,} from "@react-navigation/drawer";
import { useAuth } from "../../hooks/Auth/index";

function CustomDrawerContext(props) {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={{ marginTop: 20, justifyContent: "center", alignItems:"center", backgroundColor: "#fofofo", paddingVertical: 10,}}>
        
          <Image
              source={{
                uri: "https://github.com/emanuelliliro.png",
              }}
                style={{ width: 100, height: 100, borderRadius: 50, margin: 10 }}
                resizeMethod="auto" 
                />
          <Text
          style={{ textAlign: "center", fontSize: 16, fontFamily: "regular" }} >
           {user.user.nome}

          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "50",
          margin: "10",
          backgroundColor: "#0000ff",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontFamily: "bold" }}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContext={(props) => <CustomDrawerContext {...props} />}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Principal",
            headerTitle: "Principal",
            drawerIcon: () => (
              <Ionicons name="home-outline" size={20} color="black" />
            ),
          }}
        />
        <Drawer.Screen
          name="list"
          options={{
            drawerLabel: "Listagem",
            headerTitle: "Listagem",
            drawerIcon: () => (
              <Ionicons name="list-outline" size={20} color="black" />
            ),
          }}
        />
        <Drawer.Screen
          name="payment"
          options={{
            drawerLabel: "Pagamentos",
            headerTitle: "Pagamentos",
            drawerIcon: () => (
              <Ionicons name="diamond-outline" size={20} color="black" />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default function Layout() {
  return DrawerLayout();
}
