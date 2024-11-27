import * as ImagePicker from 'expo-image-picker';
import { useConfig } from '../hooks/Config';
import * as FileSystem from 'expo-file-system';

export function usePickImage() {
    const { directory } = useConfig();

    async function pickImage () {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                aspect: [1, 1]

            });

            if(!result.canceled) {
                // console.log("pickImage: ", result.assets[0].uri);
                const localUri = result.assets[0].uri;
                const filename = localUri.split('/').pop(); // Pega o nome do arquivo
               // pega a pasta do projeto
                const newPath = `${directory}/${filename}`;

                await FileSystem.moveAsync({
                from: localUri,
                to: newPath,
                });
                // console.log("newPath: ", newPath);
                //pegar a pasta do projeto

                return filename;
            } else return ""
        } catch(error) {
            console.log("pickImage: ", error);
            throw error;
        }
    }

    return { pickImage }
}