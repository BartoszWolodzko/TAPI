import { usePrivateChat} from "./PrivateChatContext";
import PrivateChat from "./PrivateChat";

export default function PrivateChatList() {
    const { openedChats } = usePrivateChat();
    return (
        <div>
            {openedChats.length === 0 && <p>No chats open</p>}

            {openedChats.map((chat) => (
                <div key={chat.userId}>
                    <PrivateChat userId={chat.userId} />
                </div>
            ))}
        </div>
    );
}