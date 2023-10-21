import {RefreshControl, StyleSheet, Text, useColorScheme, View} from "react-native";
import {MotiView, ScrollView} from "moti";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import axios from "axios";
import {BASE_URL} from "@env";
import Spinner from "react-native-loading-spinner-overlay";
import {SkeletonCard} from "../components/SkeletonCard";
import {Card} from "../components/Card";
import {useToast} from "react-native-toast-notifications";

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function EstudianteScreen({navigation}) {

    const {userInfo} = useContext(AuthContext);
    const toast = useToast();
    const isDark = useColorScheme();
    const scrollViewRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(100).then(() => setRefreshing(false));
    }, []);


    const getDataEstudiantes = async () => {
        setIsLoading(true)
        toast.show('Obteniendo Informacion');
        await axios.get(BASE_URL + '/api/estudiantes', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((res) => {
                const response = res.data;
                setData(response.estudiantes);
            })
            .catch((e) => {
                toast.show(`getDataEstudents error ${e}`, {
                    type: "danger",
                    animationType: "slide-in"
                })
                console.log(`getDataEstudents error ${e}`)
            })
            .finally(() => setIsLoading(false));
    };


    useEffect(() => {
        getDataEstudiantes();
    }, []);

    useEffect(() => {
        if (refreshing) {
            getDataEstudiantes();
        }
    }, [refreshing]);

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
            style={{flex: 1, backgroundColor: isDark !== "dark" ? "#FAF8F8" : "#000"}}
        >
            <View
                style={{
                    backgroundColor: isDark !== "dark" ? "#FAF8F8" : "#000"
                }}
            >
                <Spinner
                    visible={isLoading}
                    textContent={"Loading..."}
                    textStyle={{color: "#fff"}}
                />
                <ScrollView
                    ref={scrollViewRef}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                >
                    {!isLoading ? (data.map((item, key) => (
                        <Card key={key} onPress={() => {
                            navigation.navigate("Estudiante", {
                                estudiante: item
                            })
                        }}>
                            <Text style={{
                                ...styles.text,
                                color: isDark !== "dark" ? "#000" : "#fff",
                                fontWeight: "400",
                                fontSize: 20
                            }}>Matricula: {item.matricula}</Text>
                            <Text
                                style={{...styles.text, color: isDark !== "dark" ? "#000" : "#fff"}}>{item.name}</Text>
                            <Text style={{
                                fontWeight: "bold",
                                color: isDark !== "dark" ? "#000" : "#fff"
                            }}>
                                {item.curp}
                            </Text>
                        </Card>
                    ))) : (
                        <>
                            <SkeletonCard color={"dark"} heigth={90}/>
                            <SkeletonCard color={"dark"} heigth={90}/>
                            <SkeletonCard color={"dark"} heigth={90}/>
                            <SkeletonCard color={"dark"} heigth={90}/>
                            <SkeletonCard color={"dark"} heigth={90}/>
                            <SkeletonCard color={"dark"} heigth={90}/>
                            <SkeletonCard color={"dark"} heigth={90}/>
                            <SkeletonCard color={"dark"} heigth={90}/>
                            <SkeletonCard color={"dark"} heigth={90}/>
                        </>
                    )}
                </ScrollView>
            </View>
        </MotiView>
    )
        ;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
    },
});