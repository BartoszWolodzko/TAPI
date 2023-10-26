import { useEffect, useState } from 'react';
import { useUser } from "./UserContext";
import { useSocket } from "./SocketContext";
import { usePrivateChat } from "./PrivateChatContext";
export default function Users(){
    const socket = useSocket();
    const [connectedUsers, setConnectedUsers] = useState([]);
    const { openChat } = usePrivateChat();
    const { user } = useUser();

    useEffect(() => {
        if (!socket) return;
        socket.on('users', (users) => {
            setConnectedUsers(users);
        });
    } , [socket, connectedUsers]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gridArea: 'users',
        }}>
            Users connected to socket<br/>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                width: '100%',
                height: '100%',
                overflow: 'auto'
            }}>
                {connectedUsers.map((connectedUser, i) => (
                    <li
                        key={i}
                        onClick={() => {
                            const chatId = [user.id, connectedUser.userId].sort().join('@');
                            openChat(chatId);
                        }}
                        style={{
                        textAlign: connectedUser.userId === user.id ? 'right' : 'left',
                        padding: '0.5rem',
                        borderBottom: '1px solid #ccc'
                    }}>{connectedUser.userId}</li>
                ))}
            </ul>
        </div>
    );
}