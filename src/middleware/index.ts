import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod/v4';
import { HttpError } from '../errors';

interface ErrorBody {
  status: number;
  message: string;
  name: string;
}

export interface Middleware {
  exampleLogger(req: Request, res: Response, next: NextFunction): void;
  errorHandler(err: Error, req: Request, res: Response<ErrorBody>, next: NextFunction): void;
  routeNotFound(req: Request, res: Response, next: NextFunction): void;
}

export const makeMiddleware = (): Middleware => {
  return {
    exampleLogger: (req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
      next();
    },
    routeNotFound: (_req, _res, _next) => {
      throw new HttpError(404, 'Route not found');
    },
    errorHandler: (err, req, res, _next) => {
      if (err instanceof HttpError) {
        res.status(err.status).send({ status: err.status, message: err.message, name: err.name });
        return;
      } else if (err instanceof ZodError) {
        res.status(400).send({ status: 400, message: 'Invalid request', name: 'ZodError' });
        return;
      }

      console.log(`ERROR: ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - `, err);
      res.status(500).send({
        status: 500,
        message: 'Something went wrong',
        name: 'InternalServerError',
      });
    },
  };
};
