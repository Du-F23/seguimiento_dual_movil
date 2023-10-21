import {
    View,
    StyleSheet,
    useColorScheme,
    ScrollView, TouchableOpacity, Text, Dimensions, RefreshControl
} from "react-native";
import axios from "axios";
import {BASE_URL} from "@env";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {MotiView} from "moti";
import Spinner from "react-native-loading-spinner-overlay";
import {Card} from "../components/Card";
import {useToast} from "react-native-toast-notifications";

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function HomeScreen() {
    const isDark = useColorScheme();

    const {userInfo} = useContext(AuthContext);
    const scrollViewRef = useRef();
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [models, setModels] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(100).then(() => setRefreshing(false));
    }, []);


    const getTotalEntities = async () => {
      setIsLoading(true);
      toast.show('Obteniendo el total de todas las entidades')
      await axios.get(BASE_URL + '/api/totalModels', {
          headers: {
              Authorization: `Bearer ${userInfo.token}`,
          },
      }).then((res) => {
          let response  = res.data;
          setModels(response);
      })
          .catch((e) => {
              toast.show(`getDataEstudents error ${e}`);
              console.log(`getDataEstudents error ${e}`);
          })
          .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        getTotalEntities();
    }, []);

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
            style={{flex: 1,  backgroundColor: isDark !== "dark" ? "#FAF8F8" : "#000"}}
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
                <View
                    style={{
                        ...styles.container,
                        backgroundColor: isDark !== "dark" ? "#FAF8F8" : "#000"
                    }}
                >
                    <Card w={Dimensions.get("screen").width / 2}>
                        <Text style={{...styles.text, color: isDark !== "dark" ? "#000" : "#fff"}}>Estudiantes: {models.estudiantes}</Text>
                    </Card>
                    <Card w={Dimensions.get("screen").width / 2}>
                        <Text style={{...styles.text, color: isDark !== "dark" ? "#000" : "#fff"}}>Empresas: {models.empresas}</Text>
                    </Card>
                </View>
                </ScrollView>
            </View>
        </MotiView>
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
    container: {
        width: Dimensions.get("screen").width,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 4
    }
});