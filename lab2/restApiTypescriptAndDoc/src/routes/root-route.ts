import {Router} from 'express';


export const rootRouter = Router();

rootRouter.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'private, max-age=50, must-revalidate');
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});
rootRouter.post('/', (req, res) => {
    const json = req.body
    res.json(json)
});
