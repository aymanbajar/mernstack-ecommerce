import {createContext , useContext} from 'react';
//define context types
interface AuthContextType{
    username : string | null;
    token : string | null;
   isAuthenticated: boolean;
    myOrders : any[];
    login : (username:string, token:string) => void;
    logout: () => void;
    getMyOrders:() => void;
}

//define context
export const AuthContext  = createContext<AuthContextType >({
    username : null,
    token : null,
    myOrders : [],
    isAuthenticated : false,
        login : () => {},

    logout : () => {},
    getMyOrders : () => {},
});


//define useAuth hook

export const useAuth = () => useContext(AuthContext);