import { Request, Response, NextFunction, Errback } from 'express';

const errorHandler = (err:Errback, req:Request, res:Response, next: NextFunction) => {
    console.error(err);
    return res.status(500).json({
        message: 'unknown error ' + err
    });
}

export default errorHandler