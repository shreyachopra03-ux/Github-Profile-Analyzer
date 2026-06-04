import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  
  console.error('[Server Error Handled]:', error.stack || error.message);

  const statusCode = error.status || res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'An unexpected server error occurred.',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};

export default errorHandler;