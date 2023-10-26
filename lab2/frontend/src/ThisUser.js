import {useSocket} from "./SocketContext";
import {useUser} from "./UserContext";

export default function ThisUser() {
    const {user} = useUser();
    const {setStatus} = useSocket();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gridArea: 'this-user',
        }}>
            <button onClick={() => setStatus('online')}>Online</button>
            <button onClick={() => setStatus('offline')}>Offline</button>
        </div>
    );
}