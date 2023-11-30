"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsRouter = void 0;
const express_1 = __importDefault(require("express"));
const plan_1 = require("../../mocks/plan");
const querystring_1 = __importDefault(require("querystring"));
exports.groupsRouter = express_1.default.Router();
exports.groupsRouter.get('/', (_req, res) => {
    return res.status(200).json(plan_1.studentsGroups);
});
exports.groupsRouter.get('/:id?', (_req, res) => {
    const id = _req.params.id;
    if (typeof id === "undefined") {
        return res.status(400).json({ message: 'Bad request' });
    }
    else {
        const data = plan_1.studentsGroups.find(item => item.id === Number(id));
        if (!data) {
            return res.status(404).json({ message: 'studentsGroups not found' });
        }
        return res.status(200).json(data);
    }
});
exports.groupsRouter.get('/:id/plan', (_req, res) => {
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
    data = data.filter(item => item.group.id === Number(id));
    return res.status(200).json(data);
});
