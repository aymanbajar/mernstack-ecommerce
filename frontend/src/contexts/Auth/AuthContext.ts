import {createContext , useContext} from 'react';
//define context types
interface AuthContextType{
    username : string | null;
    token : string | null;
    login : (username:string, token:string) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

//define context
export const AuthContext  = createContext<AuthContextType >({
    username : null,
    token : null,
    login : () => {},
    isAuthenticated : false,
    logout : () => {}
});


//define useAuth hook

export const useAuth = () => useContext(AuthContext);