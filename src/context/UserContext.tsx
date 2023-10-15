import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";
import { getUser, isExpirationToken } from "../services/api.service";

export type User = {
    id: string
    name: string
    loggedIn: boolean
}

export interface UserContextInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
    user: {
        id: '',
        name: '',
        loggedIn: false
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


    useEffect(() => {
        if (isToken) {
            const userFromLocal = getUser(localStorage.getItem("token")!)
            id = userFromLocal.id;
            name = userFromLocal.name;
            loggedIn = userFromLocal.loggedIn;
            
            setUser(userFromLocal)
        }
      }, [isToken])

    const [user, setUser] = useState<User>({
        id,
        name,
        loggedIn
    });

    console.log("User Context", user);
    

    return (
        <UserContext.Provider value={{ user, setUser}} >
            {children}
        </UserContext.Provider>
    )
}