"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.get('/', (req, res) => {
    /*
    #swagger.tags = ['Root']
    #swagger.description = 'Health check endpoint'
    #swagger.responses[200] = {
        status: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now()
    }
     */
    res.setHeader('Cache-Control', 'private, max-age=50, must-revalidate');
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});
exports.rootRouter.post('/', (req, res) => {
    /*
    #swagger.tags = ['Root']
    #swagger.description = 'Echo endpoint'
    #swagger.parameters['json'] = {
        in: 'body',
        description: 'JSON object',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/Root" }
    }
    #swagger.responses[200] = {
        description: 'JSON object',
        schema: { $ref: "#/definitions/Root" }
    }

     */
    const json = req.body;
    res.json(json);
});
