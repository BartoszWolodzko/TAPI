import express from 'express';
import {schedule} from "../mocks/plan";
import QueryString from "querystring";

export const planRouter = express.Router()

planRouter.get('/', (req, res) => {
    // swagger
    /*
    #swagger.tags = ['Plan']
    #swagger.description = 'Endpoint to get plan'

    #swagger.parameters['from'] = {
        in: 'query',
        description: 'Start date',
        required: false,
        type: 'string'
    }
    #swagger.parameters['to'] = {
        in: 'query',
        description: 'End date',
        required: false,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Plan'
    }

     */
    let data = schedule;
    let from: string;
    if (typeof req.query.from === 'string') {
        from = QueryString.unescape(req.query.from);
        data = data.filter(item => item.start >= new Date(from));
    }

    let to: string;
    if (typeof req.query.to === 'string') {
        to = QueryString.unescape(req.query.to);
        data = data.filter(item => item.end <= new Date(to));
    }

    return res.status(200).json(schedule);
})
