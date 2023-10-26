import { usePrivateChat} from "./PrivateChatContext";
import PrivateChat from "./PrivateChat";

export default function PrivateChatsList() {
    const { openedChats } = usePrivateChat();

    return (
        <div className="private-chats-list">
            <h2>Private chats</h2>
            <ul>
                {openedChats.map(chat => (
                    <li key={chat.chatId}>
                        <PrivateChat chat={chat} />
                    </li>
                ))}
            </ul>
        </div>
    );
}