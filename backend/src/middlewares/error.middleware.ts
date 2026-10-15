import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../services/auth.service.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  
  // Check if error is an instance of AppError
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message
    })
  }

  res.status(500).json({
    message: 'Internal server error',
  });
};
