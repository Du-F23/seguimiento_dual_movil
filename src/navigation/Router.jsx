import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TouchableWithoutFeedback, useColorScheme} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "../screens/HomeScreen";
import {SettingsScreen} from "../screens/SettingsScreen";
import {LoginScreen} from "../screens/auth/LoginScreen";
import {StatusBar} from "expo-status-bar";
import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import SplashScreen from "../screens/auth/SplashScreen";
import {EstudianteScreen} from "../screens/EstudianteScreen";
import Icon from "@expo/vector-icons/Feather";
import {LogOutScreen} from "../screens/auth/LogOutScreen";
import {EstudianteShow} from "../screens/EstudianteShow";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "#1f5d50"
            },
            tabBarLabelStyle: {
                color: "#fff",
                fontWeight: "600"
            }
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
                title: "Inicio",
                tabBarInactiveTintColor: "grey",
                tabBarIcon: () => <Icon name="home" size={20} color="#fff"/>
            }}/>
            <Tab.Screen name="estudiantes" component={EstudianteScreen} options={{
                headerShown: false,
                tabBarInactiveTintColor: "grey",
                tabBarIcon: () => <Icon name="users" size={20} color="#fff" />
            }} />
        </Tab.Navigator>
    );
}



export function Router() {
    const isDark = useColorScheme();
    const {userInfo, splashLoading} = useContext(AuthContext);
    return (
        <NavigationContainer>
            <StatusBar animated={true} style="auto"/>
            <Stack.Navigator screenOptions={{
                navigationBarColor: "#1f5d50",
                headerTitleStyle: {
                    color: "#fff",
                },
                headerStyle: {
                    backgroundColor: "#1f5d50"
                },
                headerTintColor: "#fff",
            }}>
                {splashLoading ? (
                    <Stack.Screen
                        name="Splash Screen"
                        component={SplashScreen}
                        options={{headerShown: false}}
                    />
                ) : userInfo.token ? (
                    <>
                        <Stack.Screen name="HomeScreen" component={HomeTabs} options={({navigation}) => (
                            {
                                headerTitle: "Seguimiento UTVT",
                                animation: "fade",
                                headerStyle: {
                                    backgroundColor: "#1f5d50"
                                },
                                headerTitleStyle: {
                                    color: "#fff",
                                    fontWeight: "bold"
                                },
                                headerRight: () => (
                                    <TouchableWithoutFeedback onPress={() => (
                                        navigation.navigate("Logout")
                                    )}>
                                        <Icon name="log-out" size={20} color="#fff" />
                                    </TouchableWithoutFeedback>
                                )
                            })}/>
                        <Stack.Screen name="Settings" component={SettingsScreen}/>
                        <Stack.Screen name="Estudiante" component={EstudianteShow} />
                        <Stack.Screen name="Logout" component={LogOutScreen} />
                    </>) : (
                    <Stack.Screen name="Login" component={LoginScreen} options={{
                        headerShown: false
                    }}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}