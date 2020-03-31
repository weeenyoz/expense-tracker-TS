import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).send('Server Error - An error occured in the server');
};

export default errorHandler;
