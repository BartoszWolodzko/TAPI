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

let sessionStore = [];

const randomId = () => {
    return "_" + Math.random().toString(36).substr(2, 9); // canot exist in sessionStore
}

io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
        return next(new Error("invalid user"));
    }

    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
        // find existing session
        const session = sessionStore.find(session =>
            session.sessionId === sessionId && session.userId === userId);
        if (session) {
            socket.sessionId = sessionId;
            return next();
        }
    }

    socket.sessionId = randomId();
    socket.userId = userId;

    sessionStore.push({
        sessionId: socket.sessionId,
        userId: userId,
    });


    next();
});


io.on("connection", (socket) => {
    console.log("a user connected");
    socket.join(socket.userId);

    io.emit('users', sessionStore); // to everyone

    socket.emit("session", {
        sessionId: socket.sessionId,
        userId: socket.handshake.auth.userId
    });

    socket.on('join-room', (room) => {
        socket.join(room);
    });

    socket.on('leave-room', (room) => {
        socket.leave(room);
    });

    socket.on("private-message", ({ content, to }) => {
        socket.to(to).emit(`private-message-${to}`, {
            content,
            from: socket.userId,
            to,
        });
    });


    socket.on("disconnect", () => {
        sessionStore = sessionStore.filter(
            (session) => session.userId !== socket.userId
        );
        console.log("user disconnected");

        socket.broadcast.emit('users', sessionStore);
    });
});

httpServer.listen(config.socketPort)