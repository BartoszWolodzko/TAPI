import express from 'express';
import {rooms, schedule} from "../../mocks/plan";
import QueryString from "querystring";

export const roomsRouter = express.Router()

roomsRouter.get('/', (_req, res) => {
    return res.status(200).json(rooms);
})
roomsRouter.get('/:id', (_req, res) => {
    const id = _req.params.id;

    if (id === undefined) {
        return res.status(400).json({message: 'Bad request'});
    } else {
        const data = rooms.find(item => Number(item.id) === Number(id));
        if (!data) {
            return res.status(404).json({message: 'lecturer not found'});
        }
        return res.status(200).json(data);
    }
})
roomsRouter.get('/:id/plan', (_req, res) => {
    let data = schedule;
    let from: string;
    if (typeof _req.query.from === 'string') {
        from = QueryString.unescape(_req.query.from);
        data = data.filter(item => item.start >= new Date(from));
    }

    let to: string;
    if (typeof _req.query.to === 'string') {
        to = QueryString.unescape(_req.query.to);
        data = data.filter(item => item.end <= new Date(to));
    }

    const id = _req.params.id;

    if (id === undefined) {
        return res.status(400).json({message: 'Bad request'});
    }

    data = data.filter(item => Number(item.room.id) === Number(id));

    return res.status(200).json(data);
})