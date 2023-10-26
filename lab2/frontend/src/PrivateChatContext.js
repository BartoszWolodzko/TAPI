import {createContext, useContext, useEffect, useState} from 'react';
import {useUser} from "./UserContext";
import {useSocket} from "./SocketContext";

const PrivateChatContext = createContext();
export const usePrivateChat = () => {
    return useContext(PrivateChatContext);
}
export const PrivateChatProvider = ({children}) => {
    const {user} = useUser();
    const {socket} = useSocket();
    const [openedChats, setOpenedChats] = useState([]);

    const openChat = (chatId) => {
        if (!openedChats
            .find(chat => {
                return chat.chatId === chatId
            })) {
            socket.emit('get-messages', chatId);
        }
        setOpenedChats([...openedChats, {chatId, messages: []}]);
    }

    const closeChat = (chatId) => {
        setOpenedChats(openedChats.filter(chat => chat.chatId !== chatId));
    }

    const sendMessage = (content, chatId) => {
        socket.emit('private-message', {content, chatId});
        // add message to opened chats
        const chat = openedChats.find(chat => chat.chatId === chatId);
        chat.messages.push({
            content,
            from: user.id,
            chatId,
        });
        setOpenedChats([...openedChats]);
    }

    useEffect(() => {
        if (!socket) return;
        socket.on('messages', (messages) => {
            if (messages.length === 0) return;
            const chat = openedChats.find(chat => chat.chatId === messages[0].chatId);
            if (chat) {
                chat.messages = messages;
                setOpenedChats([...openedChats]);
            } else {
                setOpenedChats([...openedChats, {chatId: messages[0].chatId, messages}]);
            }
        });

        socket.on('private-message', (message) => {
            const chat = openedChats.find(chat => chat.chatId === message.chatId);
            if (chat) {
                chat.messages.push(message);
                setOpenedChats([...openedChats]);
            } else {
                openChat(message.chatId)
            }
        });

    }, [socket, openedChats]);


    return (
        <PrivateChatContext.Provider value={{openedChats, setOpenedChats, openChat, closeChat, sendMessage}}>
            {children}
        </PrivateChatContext.Provider>
    );
}