import { Request, Response } from 'express';

const fourOhFour = (_req: Request, res:Response) => {
    return res.status(404)
        .json({message: 'not found'});
}

export default fourOhFour