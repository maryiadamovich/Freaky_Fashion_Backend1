// this file is used to store the user information
import React from "react";
import { createContext, useState, useContext, ReactNode } from "react";


// waiting that format from LoginPage
interface User {
    name: string;
    email: string;
}

// declare what will be send to a component
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoggedIn: boolean;
}

//interface for UserProviderProps 
interface UserProviderProps {
    children: ReactNode;
}

// create context with type
export const UserContext = createContext<UserContextType | undefined>(undefined);

//Hero will be wraped
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const isLoggedIn = user !== null;

    return <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
        {children}
    </UserContext.Provider>;
};

// useUser will be used in the Hero component
export const useUser = () => { return useContext(UserContext); };