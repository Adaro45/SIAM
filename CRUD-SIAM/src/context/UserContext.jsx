import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logInUser = (userName) => {
        setUser(userName);
    };

    const logOutUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, logInUser, logOutUser }}>
            {children}
        </UserContext.Provider>
    );
};
