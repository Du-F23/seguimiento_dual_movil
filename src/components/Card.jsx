import {TouchableOpacity, View, StyleSheet, useColorScheme} from "react-native";

export function Card({ children, w, onPress }) {
    const isDark = useColorScheme();
    return(
        <View style={{...styles.card, backgroundColor:  isDark !== "dark" ? "#fff" : "#000", width: w !== null ? w : null}}>
            <TouchableOpacity
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        resizeMode: "cover",
        alignContent: "center",
        justifyContent: "center",
        margin: 10
    },
    text: {
        fontSize: 30,
    },
})