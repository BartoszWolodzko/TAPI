import Users from "./Users";
import PrivateChatsList from "./PrivateChatsList";
import ThisUser from "./ThisUser";

export default function App() {
    return (
        <div className="App" style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gridTemplateRows: "1fr 3fr",
            gridTemplateAreas: `
                "chatlist this-user"
                "chatlist users"
            `,
            height: "100vh",
            width: "100vw",
        }}>
            <ThisUser/>
            <Users/>
            <PrivateChatsList/>
        </div>
    );
}
