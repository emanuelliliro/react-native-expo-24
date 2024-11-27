import { useFonts } from "expo-font";
import { createContext, useContext } from "react";
import { ActivityIndicator,Text, View } from "react-native";

const FontContext = createContext({});

export function FontProvider({children}) {

    const [loaded, error] = useFonts({
        BonaNovaSCRegular: require("../../assets/fonts/BonaNovaSC-Regular.ttf"),
        MontserratRegular: require("../../assets/fonts/Montserrat-Regular.ttf"),
        MontserratLight: require("../../assets/fonts/Montserrat-Light.ttf"),
        OpenSansMedium: require("../../assets/fonts/OpenSans-Medium.ttf"),
        OpenSansLight: require("../../assets/fonts/OpenSans-Light.ttf"),
        RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
        RobotoLight: require("../../assets/fonts/Roboto-Light.ttf"),
        RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    });

    if (!loaded && !error) {
       return (
        <View style= {{flex:1, justifyContent:"center", alignItems: "center"}}>
            <Text style={{fontSize: 28, marginTop: 15}}>  {/*Pagina de carregamento*/}
                Carregando as fontes 
            </Text>
            <ActivityIndicator size="large" color= "#0000ff"/> 
       </View>
      );
      }

      return <FontContext.Provider value={{ loaded }}>{children}</FontContext.Provider>;
    }

export function useFont() {
    const context = useContext(FontContext);
    if(!context) {
        throw new Error("useFont must be used within a FontProvider");
    }
    return context;
}