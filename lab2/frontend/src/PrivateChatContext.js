import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from "./UserContext";
import {useSocket} from "./SocketContext";

const PrivateChatContext = createContext();

export const usePrivateChat = () => {
    return useContext(PrivateChatContext);
}

export const PrivateChatProvider = ({ children }) => {
    const { user } = useUser();
    const socket = useSocket();
    const [openedChats, setOpenedChats] = useState([]);

    return (
        <PrivateChatContext.Provider value={{ openedChats, setOpenedChats }}>
            {children}
        </PrivateChatContext.Provider>
    );
}