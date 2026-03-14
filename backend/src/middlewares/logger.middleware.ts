import { type Request, type Response, type NextFunction } from "express";

export const logger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next();
}