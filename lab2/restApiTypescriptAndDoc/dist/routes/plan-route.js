"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planRouter = void 0;
const express_1 = __importDefault(require("express"));
const plan_1 = require("../mocks/plan");
const querystring_1 = __importDefault(require("querystring"));
exports.planRouter = express_1.default.Router();
exports.planRouter.get('/', (req, res) => {
    /*
        #swagger.tags = ['Plan']
        #swagger.description = 'Get plan information'
        #swagger.parameters['from'] = {
            in: 'query',
            description: 'Start date',
            type: 'string'
        }
        #swagger.parameters['to'] = {
            in: 'query',
            description: 'End date',
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Plan information',
            schema: { $ref: "#/definitions/Plan" }
        }
        #swagger.responses[400] = {
            description: 'Invalid request data'
        }
        #swagger.responses[500] = {
            description: 'Server error'
        }

     */
    let data = plan_1.schedule;
    let from;
    if (typeof req.query.from === 'string') {
        from = querystring_1.default.unescape(req.query.from);
        data = data.filter(item => item.start >= new Date(from));
    }
    let to;
    if (typeof req.query.to === 'string') {
        to = querystring_1.default.unescape(req.query.to);
        data = data.filter(item => item.end <= new Date(to));
    }
    return res.status(200).json(plan_1.schedule);
});
