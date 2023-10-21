import {
    Pressable,
    TouchableHighlight,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    Text,
    useColorScheme
} from "react-native";
import {useContext, useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {AuthContext} from "../../context/AuthProvider";
import Spinner from "react-native-loading-spinner-overlay";
import { useToast } from "react-native-toast-notifications";

export function LoginScreen() {
    const isDark = useColorScheme();

    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(true);

    const {login, isLoading} = useContext(AuthContext);

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: isDark !== "dark" ? null : "#000",
            }}
        >
            <Spinner
                visible={isLoading}
                textContent={"Loading..."}
                textStyle={{ color: "#fff" }}
            />
            <View style={styles.header}>
                <Text style={{
                    ...styles.headerText,
                    color: isDark !== "dark" ? "#000" : "#fff"
                }}>Seguimiento Dual UTVT | Inicia Sesion</Text>
            </View>
            <View style={styles.containerGroup}>
                <Text style={{
                    ...styles.label,
                    color: isDark !== "dark" ? "#000" : "#fff"
                }}>Correo Electronico</Text>
                <TextInput
                    placeholder="Ingrese su correo electronico"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    style={{
                        ...styles.textInput,
                        color: isDark !== "dark" ? "#000" : "#fff"
                    }}
                    textContentType="emailAddress"
                    placeholderTextColor={
                        isDark !== "dark" ? "#000" : "#fff"
                    }
                />
                <Text style={{...styles.label, color: isDark !== "dark" ? "#000" : "#fff"}}>Contraseña</Text>
                <View style={styles.containerBottom}>
                    <TextInput
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        style={{...styles.textInput, color: isDark !== "dark" ? "#000" : "#fff"}}
                        secureTextEntry={visible}
                        placeholderTextColor={
                            isDark !== "dark" ? "#000" : "#fff"
                        }
                    />
                    <Pressable onPress={() => setVisible(!visible)}>
                        <Icon
                            name={visible ? "eye-off" : "eye"}
                            size={30}
                            color={isDark !== "dark" ? "#000" : "#fff"}
                            style={{
                                marginTop: 10,
                                marginLeft: 15,
                            }}
                        />
                    </Pressable>
                </View>
                <TouchableHighlight
                    onPress={() => {
                        login(email, password)
                        toast.show('Iniciando Sesion, por favor espere!')
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Iniciar Sesion</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 30,
        margin: 10,
    },
    containerGroup: {
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width - 100,
    },
    label: {
        fontSize: 25,
        fontWeight: "bold",
    },
    containerBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: Dimensions.get("window").width - 100,
        verticalAlign: "bottom",
        marginLeft: 16,
    },
    textInput: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        marginTop: 15,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f5d50",
        borderRadius: 10,
        marginTop: 10,
        width: 200,
        height: 50,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});