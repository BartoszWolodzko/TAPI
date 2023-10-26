
import Users from "./Users";
import PrivateChatsList from "./PrivateChatsList";

export default function App() {
    return (
        <div className="App" style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gridTemplateAreas: `
                "chatlist users"
            `,
            height: "100vh",
            width: "100vw",
        }}>
            <Users />
            <PrivateChatsList />
        </div>
    );
}
