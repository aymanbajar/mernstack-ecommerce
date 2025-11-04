import { type FC, type PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const AuthProvider :FC<PropsWithChildren> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (username:string, token:string) => {
        setUsername (username);
        setToken (token);
        localStorage.setItem (USERNAME_KEY, username);
        localStorage.setItem (TOKEN_KEY, token);
    }
    return (
        <AuthContext.Provider value ={{ username, token, login}}>
            {children}
        </AuthContext.Provider>
    )
}