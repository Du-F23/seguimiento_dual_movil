import React from "react";
import {ActivityIndicator, View, StyleSheet, useColorScheme} from "react-native";

export default function SplashScreen() {
    const isDark = useColorScheme();
    return (
        <View
            style={{
                ...style.con,
                backgroundColor: isDark !== "dark" ? "#FAF8F8" : "#000"
            }}
        >
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
}

const style = StyleSheet.create({
    con: {
        flex: 1,
        justifyContent: "center",
    },
});