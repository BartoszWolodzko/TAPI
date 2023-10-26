import app from './app'
import config from './config'

app.listen(config.apiPort, ()=>{
    console.log(`🚀 ${config.name} ${config.version} 🚀`)
    console.log(`🚀 Listening on ${config.apiPort} with NODE_ENV=${config.nodeEnv} 🚀`)
})

import { Server } from "socket.io";
import { createServer } from "http";
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: config.clientOrigins[config.nodeEnv]
    }
});

// wywalic to do bazy danych
let sessionStore = [];
let messagesStore = [];
let chatsStore = [];

const randomId = () => {
    // this shouldnt exist in sessionStore
    return "_" + Math.random().toString(36).substr(2, 9);
}

io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
        return next(new Error("invalid user"));
    }

    socket.userId = userId;

    sessionStore.push({
        userId: userId,
    });

    next();
});


io.on("connection", (socket) => {
    console.log("a user connected");

    // dzieki temu wszystkie zakladki
    // i urzadzenia dostaja socket.to(userId)
    socket.join(socket.userId);

    // czy to potrzebne?
    // czy to bezpieczne!?
    socket.emit("session", {
        userId: socket.handshake.auth.userId
    });

    //debug
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    //send users to everyone
    io.emit('users', sessionStore);

    //on open chat window get messages
    // this should be done in rest api
    socket.on('get-messages', (chatId) => {
        const messages = messagesStore.filter(message =>
            message.chatId === chatId
        );
        socket.emit('messages', messages);
    });

    //ktos gdzies wyslal wiadomosc
    socket.on("private-message", ({ content, chatId }) => {
        //wyciagnij id uczestnikow
        let usersId = chatId.split('@');

        //if chat doesn't exist, create it
        //later we can add list of chats
        // in witch user is participating
        if (!chatsStore.find(chat => chat.chatId === chatId)) {
            chatsStore.push({ chatId, usersId: usersId });
        }

        //censures message goes here
        // content = tomek(content);

        //create message
        const message = { content, from: socket.userId, chatId };

        //store message
        messagesStore.push(message);

        //send to all users in chat
        socket.to(usersId).to(socket.userId).emit("private-message", message);
    });


    socket.on("disconnect", () => {
        //remove user from sessionStore
        sessionStore = sessionStore.filter(
            (session) => session.userId !== socket.userId
        );

        if(sessionStore.find(session => session.userId === socket.userId)){
            console.log('user disconnected but still connected with another');
        } else {
            console.log('user disconnected');

            //remove user from users list
            io.emit('users', sessionStore);
        }
    });
});

httpServer.listen(config.socketPort)