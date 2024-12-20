import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {

    const [page, setPage] = useState(0);


    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    }

    return (
        <View style={styles.container}>
            <PagerView 
            initialPage={0}
             style={styles.content} 
             onPageSelected={onPageSelected}
             >
                <View key="1"style={styles.page}>
                    <Text style={styles.text}>1</Text>
                </View>
                <View key="2" style={styles.page}>
                    <Text style={styles.text}> 2</Text>
                </View>
                <View key="3" style={styles.page}>
                    <Text style={styles.text}> 3</Text>
                </View>
            </PagerView>
            <View style={styles.bulletContent}>
                <View style={[styles.bullet, page === 0 && styles.activeBullet,{ backgroundColor: 'purple' },]}></View>
                <View style={[styles.bullet, page === 1 && styles.activeBullet,{ backgroundColor: 'blue' },]}></View>
                <View style={[styles.bullet, page === 2 && styles.activeBullet,{ backgroundColor: 'pink' },]}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginTop: 10,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    bulletContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 10,
    },
    activeBullet: {
        backgroundColor: '#8da59f',
    },
    text: {
        fontSize: 40,
        fontFamily: 'bold',
        color: 'black',
    },
});