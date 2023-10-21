import {StyleSheet, Text, useColorScheme, View} from "react-native";
import {MotiView} from "moti";

export function EstudianteShow({route}) {

    const isDark = useColorScheme();

    const {estudiante} = route.params;

    return (
        <MotiView
            from={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                type: "timing",
                duration: 4000,
            }}
            style={{
                flex: 1,
                backgroundColor: isDark !== "dark" ? "#FAF8F8" : "#000",
                padding: 10,
                resizeMode: "cover",
            }}
        >
            <Text style={{
                ...styles.text,
                color: isDark !== "dark" ? "#000" : "#fff",
                fontWeight: "400",
                fontSize: 20
            }}>Matricula: {estudiante.matricula}</Text>
            <Text
                style={{...styles.text, color: isDark !== "dark" ? "#000" : "#fff"}}>{estudiante.name}</Text>
            <Text style={{
                fontWeight: "bold",
                color: isDark !== "dark" ? "#000" : "#fff"
            }}>
                {estudiante.curp}
            </Text>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
    },
});