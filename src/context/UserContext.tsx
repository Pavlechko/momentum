import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";
import { getUser, isExpirationToken } from "../services/api.service";

export type User = {
    id: string
    name: string
    loggedIn: boolean
    isError: boolean
    message: string
}

export interface UserContextInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
    user: {
        id: '',
        name: '',
        loggedIn: false,
        isError: false,
        message: '',
    },
    setUser: (user: User) => {}
} as UserContextInterface

export const UserContext = createContext(defaultState);

type UserProviderProps = {
    children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
    let isToken = isExpirationToken(localStorage.getItem("token")!)
    console.log("User Context", isToken);

    let id = 'Wrong';
    let name = 'Wrong';
    let loggedIn = false;
    let isError = false;
    let message = '';


    useEffect(() => {
        if (isToken) {
            const userFromLocal = getUser(localStorage.getItem("token")!)
            id = userFromLocal.id;
            name = userFromLocal.name;
            loggedIn = userFromLocal.loggedIn;
            isError = userFromLocal.isError;
            message = userFromLocal.message;
            
            setUser(userFromLocal)
        }
      }, [isToken])

    const [user, setUser] = useState<User>({
        id,
        name,
        loggedIn,
        isError,
        message
    });

    console.log("User Context", user);
    

    return (
        <UserContext.Provider value={{ user, setUser}} >
            {children}
        </UserContext.Provider>
    )
}