import {useUser} from "./UserContext";
import {useSocket} from "./SocketContext";
import {useEffect, useState} from "react";

export default function PrivateChat({ userId }) {
    const { user } = useUser();
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        if (!socket) return;
        socket.on(`private-message-${userId}`, (message) => {
            setMessages((prev) => [...prev, message]);
        });
    }, [socket, userId]);

    const sendMessage = () => {
        if (message) {
            socket.emit('private-message', {
                content: message,
                to: userId,
                from: user.id,
            });
            setMessages((prev) => [
                ...prev,
                {
                    content: message,
                    to: userId,
                    from: user.id,
                },
            ]);
            setMessage('');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
            <h3>Private chat with {userId}</h3>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto'
                }}>
                    {messages.map((message, i) => (
                        <li
                            key={i}
                            style={{
                                textAlign: message.from === user.id ? 'right' : 'left',
                                padding: '0.5rem',
                                borderBottom: '1px solid #ccc'
                            }}>{message.content}</li>
                    ))}
                </ul>
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Say something..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}