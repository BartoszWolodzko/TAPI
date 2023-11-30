import express from 'express';
import {schedule, studentsGroups} from "../../mocks/plan";
import QueryString from "querystring";

export const groupsRouter = express.Router()

groupsRouter.get('/', (_req, res) => {
    return res.status(200).json(studentsGroups);
})
groupsRouter.get('/:id?', (_req, res) => {
    const id: string | undefined = _req.params.id;

    if (typeof id === "undefined") {
        return res.status(400).json({message: 'Bad request'});
    } else {
        const data = studentsGroups.find(item => item.id === Number(id));
        if (!data) {
            return res.status(404).json({message: 'studentsGroups not found'});
        }
        return res.status(200).json(data);
    }
})

groupsRouter.get('/:id/plan', (_req, res) => {
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

    data = data.filter(item => item.group.id === Number(id));

    return res.status(200).json(data);
})