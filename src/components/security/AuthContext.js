import { createContext, useContext, useState } from "react";
import {  executeBasicAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//1. Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2. Share the Created context with other Components

export default function AuthProvider({ children }) {

    //3. Put Some state in the Context

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

     async function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username + ":" + password)
        console.log("inside login func");
        console.log(baToken);
        try{
        const response = await executeBasicAuthenticationService(baToken)
       console.log(response.data);

        if(response.status === 200){
                    setAuthenticated(true)
                    setUsername(username)
                    setToken(baToken)
                    console.log("inside status 200");
                    apiClient.interceptors.request.use(
                        (config) => {
                            console.log('intercepting and adding a token')
                            config.headers.Authorization = baToken
                            return config
                        }
                    )

                    return true
                   }
                   else{
                    logout()
                    return false
                   }
                }catch(error){
                   logout()
                    return false
                }
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
            <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
                {children}
            </AuthContext.Provider>
    )
}