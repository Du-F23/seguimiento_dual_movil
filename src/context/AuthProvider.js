import React, { createContext, useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";
import axios from "axios";
// import {BASE_URL} from "../config";
import { BASE_URL } from "@env";
import {useToast} from "react-native-toast-notifications";
import toast from "react-native-toast-notifications/src/toast";


export const storage = new MMKV();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const toast = useToast();

    const login = (email, password) => {
        setIsLoading(true);
        let toasts = toast.show("Iniciando sesión...", {
            duration: 1000,
            position: toast.POSITION.TOP,
            type: "success",
        });

        axios
            .post(BASE_URL + "/login", {
                email,
                password,
            })
            .then((res) => {
                let user = res.data;
                setUserInfo(user);
                storage.set("userInfo", JSON.stringify(user));
                setIsLoading(false);
                toast.update(toasts, "Sesión iniciada", {
                    type: "success",
                    duration: 1000,
                });
            })
            .catch((e) => {
                console.log(`login error ${e}`);
                setErrors(JSON.stringify(e));
                setIsLoading(false);

                toast.update(toasts, "Error al iniciar sesión", {
                    type: "error",
                    duration: 1000,
                });
            });
    };

    const logout = () => {
        let toasts = toast.show("Cerrando sesión...", {
            duration: 1000,
            position: toast.POSITION.TOP,
            type: "success",
        });
        setIsLoading(true);
        storage.delete("userInfo");
        setUserInfo({});
        setIsLoading(false);
        toast.update(toasts, "Sesión cerrada", {
            type: "success",
            duration: 1000,
        });
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfos = storage.getString("userInfo");
            userInfos = JSON.parse(userInfos);
            if (userInfos) {
                setUserInfo(userInfos);
            }
            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                errors,
                splashLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};