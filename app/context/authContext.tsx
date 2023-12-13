import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import useJwt from 'app/hooks/use-jwt';


interface AuthProps {
    authState?: {token: string | null; refreshToken: string | null; authenticated: boolean | null; loading: boolean | null};
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    setAuthState?: (bj: any) => any;
}

const TOKEN_KEY = "my-jwt";
const RTOKEN_KEY = "my-refresh-jwt";
export const API_URL = 'http://192.168.1.94:4000';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () =>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        refreshToken: string | null;
        authenticated: boolean | null; 
        loading: boolean | null,
    }>({
        token: null,
        refreshToken: null,
        authenticated: null,
        loading: true
    })

    useEffect(() => {
        const loadToken = async () =>{
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const refreshToken = await SecureStore.getItemAsync(RTOKEN_KEY);
            console.log("Stored", token)
            console.log("Stored refresh", refreshToken)

            if(!refreshToken){
                setAuthState({
                    token: null,
                    refreshToken: null,
                    authenticated: false,
                    loading: false,
                }) 
                return ;
            }
            const decodedToken = useJwt(refreshToken!)
                console.log("🚀 ~ file: authContext.tsx:47 ~ loadToken ~ decodedToken:", decodedToken.exp)
                               

                setAuthState({
                    token: token,
                    refreshToken: refreshToken,
                    authenticated: true,
                    loading: false,
                })
            
        }
        loadToken();
    }, [])

    const register = async (email: string, password: string) => {
        try{
            return await axios.post(`${API_URL}/auth/local/register`, {email, password, firstName: 'Paolo',lastName: 'Rossi'});
        }catch (err){
            return {error: true, msg: (err as any).response.data.msg}
        }
    }

    const login = async (email: string, password: string) => {
        try{
            const result = await axios.post(`${API_URL}/auth/local/login`, {email, password});
            console.log("🚀 ~ file: authContext.tsx:41 ~ login ~ result:", result.data)

            setAuthState({
                token: result.data.accessToken,
                refreshToken: result.data.refreshToken,
                authenticated: true,
                loading: false,
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;



            await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);
            await SecureStore.setItemAsync(RTOKEN_KEY, result.data.refreshToken);

            return result;
        }catch (err){
            return {error: true, msg: (err as any).response.data.msg}
        }
    }

    const logout = async () => {
        const result = await axios.patch(`${API_URL}/auth/local/disconnect`, {refreshToken: authState.refreshToken})


       await SecureStore.deleteItemAsync(TOKEN_KEY);

       axios.defaults.headers.common['Authorization'] = '';

       setAuthState({
        token: null,
        refreshToken: null,
        authenticated: false,
        loading: false,
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        setAuthState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}