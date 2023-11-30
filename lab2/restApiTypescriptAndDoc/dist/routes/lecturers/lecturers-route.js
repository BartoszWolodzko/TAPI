"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lecturersRouter = void 0;
const express_1 = __importDefault(require("express"));
const querystring_1 = __importDefault(require("querystring"));
exports.lecturersRouter = express_1.default.Router();
const plan_1 = require("../../mocks/plan");
exports.lecturersRouter.get('/', (_req, res) => {
    return res.status(200).json(plan_1.lectures);
});
exports.lecturersRouter.get('/:id', (_req, res) => {
    const id = _req.params.id;
    if (typeof id === 'undefined') {
        return res.status(400).json({ message: 'Bad request' });
    }
    else {
        const data = plan_1.lectures.find(item => item.id === Number(id));
        if (!data) {
            return res.status(404).json({ message: 'lecturer not found' });
        }
        return res.status(200).json(data);
    }
});
exports.lecturersRouter.get('/:id/plan', (_req, res) => {
    let data = plan_1.schedule;
    let from;
    if (typeof _req.query.from === 'string') {
        from = querystring_1.default.unescape(_req.query.from);
        data = data.filter(item => item.start >= new Date(from));
    }
    let to;
    if (typeof _req.query.to === 'string') {
        to = querystring_1.default.unescape(_req.query.to);
        data = data.filter(item => item.end <= new Date(to));
    }
    const id = _req.params.id;
    if (id === undefined) {
        return res.status(400).json({ message: 'Bad request' });
    }
    data = data.filter(item => item.lecturer.id === Number(id));
    return res.status(200).json(data);
});
