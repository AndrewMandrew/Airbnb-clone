import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null; loading: boolean | null};
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = 'https://api.developbetterapps.com';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () =>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null; 
        loading: boolean | null,
    }>({
        token: null,
        authenticated: null,
        loading: true
    })

    useEffect(() => {
        const loadToken = async () =>{
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("Stored", token)

            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                    loading: false,
                })
            } else {
                setAuthState({
                    token: null,
                    authenticated: false,
                    loading: false,
                })
            }
            
        }
        loadToken();
    }, [])

    const register = async (email: string, password: string) => {
        try{
            return await axios.post(`${API_URL}/users`, {email, password});
        }catch (err){
            return {error: true, msg: (err as any).response.data.msg}
        }
    }

    const login = async (email: string, password: string) => {
        try{
            const result = await axios.post(`${API_URL}/auth`, {email, password});
            console.log("🚀 ~ file: authContext.tsx:41 ~ login ~ result:", result)

            setAuthState({
                token: result.data.token,
                authenticated: true,
                loading: false,
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

            return result;
        }catch (err){
            return {error: true, msg: (err as any).response.data.msg}
        }
    }

    const logout = async () => {
       await SecureStore.deleteItemAsync(TOKEN_KEY);

       axios.defaults.headers.common['Authorization'] = '';

       setAuthState({
        token: null,
        authenticated: false,
        loading: false,
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}