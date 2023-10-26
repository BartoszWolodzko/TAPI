import {createContext, useContext, useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {useUser} from "./UserContext";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState();
    const {user} = useUser();

    const setStatus = (status) =>{
        socket.emit('status-change', status);
    }

    useEffect(() => {
        if (!user) return;

        let socketId = localStorage.getItem('socketId');
        let newSocket
        if (socketId != null) {
            newSocket = io('http://localhost:8001', {
                auth: {
                    userId: user.id,
                    sessionId: socketId
                }
            });
        } else {
            newSocket = io('http://localhost:8001', {
                auth: {
                    userId: user.id
                }
            });

        }
        setSocket(newSocket);
        return () => newSocket.disconnect()
    }, [user]);

    useEffect(() => {

        if (!socket) return;
        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('session', ({sessionId}) => {
            localStorage.setItem('socketId', sessionId);
        });

        socket.onAny((event, ...args) => {
            console.log(event, args);
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });

        return () => {
            socket.offAny();
            socket.off('session');
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{socket, setStatus}}>
            {children}
        </SocketContext.Provider>
    )
}