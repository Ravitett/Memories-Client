import React, { createContext, useEffect, useState } from 'react';
import { isToken, isAdmin } from './Api/auth';

export const Context = createContext()

export default function ContextProvider(props) {

    const [userLogin, setUserLogin] = useState(true);
    const [userAdmin, setUserAdmin] = useState(true);
    const [userName, setUserName] = useState("אורח");

    useEffect(async () => {

        let token = await isToken();
        let admin = await isAdmin();

        const nameFromLocalStorage = () => {
            setUserName(localStorage.getItem('memories-fullName'));
        }

        if(!token && !admin){
            setUserLogin(false);
            setUserAdmin(false);
            return;
        }

        if(token && !admin){
            setUserLogin(true);
            setUserAdmin(false);
            nameFromLocalStorage();
            return;  
        }

        if(token && admin){
            setUserLogin(true);
            setUserAdmin(true);
            nameFromLocalStorage();
            return;  
        }
    
    }, [])

    return (
        <Context.Provider value={{
            userLoginContext: [userLogin, setUserLogin],
            userAdminContext: [userAdmin, setUserAdmin],
            userNameContext: [userName, setUserName]
        }}>
            {props.children}
        </Context.Provider>
    )
}

