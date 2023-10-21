import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthProvider";

export function LogOutScreen() {
    const {logout} = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => logout()}>
                <Text>LogOut</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});