import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {SocketProvider} from "./SocketContext";
import {UserProvider} from "./UserContext";
import {PrivateChatProvider} from "./PrivateChatContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
        <SocketProvider>
            <PrivateChatProvider>
                <App />
            </PrivateChatProvider>
        </SocketProvider>
    </UserProvider>
  </React.StrictMode>
);

