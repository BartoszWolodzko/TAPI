"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// import fourOhFour from './middleware/fourOhFour';
// import errorHandler from './middleware/errorHandler';
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)({
    origin: '*',
}));
// app.use(fourOhFour)
//
// app.use(errorHandler)
const routes_1 = require("./routes");
app.use(routes_1.routes);
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = require("fs");
const swaggerOutput = JSON.parse((0, fs_1.readFileSync)('./src/swagger_output.json', 'utf8'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOutput));
app.listen(8000, () => {
    console.log(`🚀 Listening on 8000 🚀`);
});
const socket_io_1 = require("socket.io");
const http_1 = require("http");
// connect socket.io to the server from another file
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    }
});
exports.io = io;
