// this file is used to store the user information
import React from "react";
import { createContext, useState, useContext, ReactNode } from "react";


// waiting that format
interface User {
    id: number;
    name: string;
    email: string;
}

// declare what will be send to the components
interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User | null) => void;
}

//interface for UserProviderProps 
interface UserProviderProps {
    children: ReactNode;
}

// create context with type
export const UserContext = createContext<UserContextType | undefined>(undefined);

//app will be wraped in UserProvider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const isLoggedIn = !!user;

    return <UserContext.Provider value={{ user, isLoggedIn, setUser }}>
        {children}
    </UserContext.Provider>;
};

// useUser will be used in the components
export const useUser = () => { return useContext(UserContext); };