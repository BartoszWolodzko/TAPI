import { usePrivateChat} from "./PrivateChatContext";
import {useEffect, useState} from "react";
import {useUser} from "./UserContext";
export default function PrivateChat({ chat }) {
    const { user } = useUser();
    const { sendMessage } = usePrivateChat();
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(message, chat.chatId);
        setMessage('');
    }

    console.log(chat);

    return (
        <div className="private-chat">
            <h3>Chat id: {chat.chatId}</h3>
            <ul>
                {chat.messages.map(message => (
                    <li>
                        {message.from === user.id ? 'You' : message.from}:
                        {message.content}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}