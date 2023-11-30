import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import fourOhFour from './middleware/fourOhFour';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(helmet())
app.use(morgan('tiny'))

app.use(cors({
    origin: '*',
}))



import {routes} from "./routes";
app.use(routes);



import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
import {Server, Socket} from "socket.io";
import {createServer} from "http";

// connect socket.io to the server from another file
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

interface Session {
    userId: string,
    socketId: string,
    status?: string,
}

interface Message {
    content: string,
    from: string,
    chatId: string,
}

interface Chat {
    chatId: string,
    usersId: string[],
}

// wywalic to do bazy danych
let sessionStore : Session[] = [];
let messagesStore : Message[] = [];
let chatsStore : Chat[] = [];
let possibleStatuses = ['online', 'offline', 'away', "busy"];

const randomId = () => {
    // this shouldnt exist in sessionStore
    return "_" + Math.random().toString(36).substr(2, 9);
}

interface SocketWithUserId extends Socket {
    userId: string,
}

io.use((socket , next) => {
    let socketWithUserId = socket as SocketWithUserId;
    const userId = socket.handshake.auth.userId;
    if (!userId) {
        return next(new Error("invalid user"));
    }

    socketWithUserId.userId = userId;

    sessionStore.push({
        userId: userId,
        socketId: socket.id,
    });

    next();
});


io.on("connection", (socket) => {
    let socketWithUserId = socket as SocketWithUserId;
    console.log("a user connected");

    // dzieki temu wszystkie zakladki
    // i urzadzenia dostaja socket.to(userId)
    socket.join(socketWithUserId.userId);

    // logike wywalil bym na fronta
    // i tam mozna zapisytac ostatni stan w cookies
    socket.on('status-change', (status) => {
        const session = sessionStore.find(session => session.userId === socketWithUserId.userId);
        if (!session) return;
        if (!possibleStatuses.includes(status)) return;
        session.status = status;
        io.emit('users', sessionStore);
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
    socket.on("private-message", ({content, chatId}) => {
        //wyciagnij id uczestnikow
        let usersId = chatId.split('@');

        //if chat doesn't exist, create it
        //later we can add list of chats
        // in witch user is participating
        if (!chatsStore.find(chat => chat.chatId === chatId)) {
            chatsStore.push({chatId, usersId: usersId});
        }

        //censures message goes here
        // content = tomek(content);

        //create message
        const message = {content, from: socketWithUserId.userId, chatId};

        //store message
        messagesStore.push(message);

        //send to all users in chat
        socket.to(usersId).to(socketWithUserId.userId).emit("private-message", message);
    });


    socket.on("disconnect", () => {
        //remove user from sessionStore
        sessionStore = sessionStore.filter(
            (session) => session.userId !== socketWithUserId.userId
        );
        // @ts-ignore
        if (sessionStore.find(session => session.userId === socket.userId)) {
            console.log('user disconnected but still connected with another');
        } else {
            console.log('user disconnected');

            //remove user from users list
            io.emit('users', sessionStore);
        }
    });
});

httpServer.listen(8001)

app.use(fourOhFour)

app.use(errorHandler)

app.listen(8000, () => {
    console.log(`🚀 Listening on 8000 🚀`)
})

