import { useEffect, useState } from 'react';
import { useUser } from "./UserContext";
import { useSocket } from "./SocketContext";
import { usePrivateChat } from "./PrivateChatContext";
export default function Users(){
    const { user } = useUser();
    const socket = useSocket();
    const [users, setUsers] = useState([]);
    const { openedChats, setOpenedChats } = usePrivateChat();

    useEffect(() => {
        if (!socket) return;
        socket.on('users', (users) => {
            setUsers(users);
        });
    } , [socket, users]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
            Users connected to socket
            <ul style={{
                listStyle: 'none',
                padding: 0,
                width: '100%',
                height: '100%',
                overflow: 'auto'
            }}>
                {users.map((user, i) => (
                    <li
                        key={i}
                        onClick={() => {
                            if (user.userId === user.id) return;
                            if (openedChats.find((chat) => chat.userId === user.userId)) return;
                            setOpenedChats((prev) => [
                                ...prev,
                                {
                                    userId: user.userId,
                                }
                            ]);
                        }}
                        style={{
                        textAlign: user.userId === user.id ? 'right' : 'left',
                        padding: '0.5rem',
                        borderBottom: '1px solid #ccc'
                    }}>{user.userId}</li>
                ))}
            </ul>
        </div>
    );
}