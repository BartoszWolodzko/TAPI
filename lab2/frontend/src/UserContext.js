import {createContext, useContext, useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        let userFromStorage
        try {
            userFromStorage = localStorage.getItem('user');
        } catch (error) {
            console.log('error', error)
        }

        if (userFromStorage === null) {
            const newUser = {
                id: uuidv4(),
                name: `User${Math.floor(Math.random() * 1000000)}`,
            }
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
        } else {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}