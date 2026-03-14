import { type Request, type Response, type NextFunction } from "express";
import { flashcardSchema } from "../utils/flashcard.schema.js";

export const validate = (schema: any) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error });
    }
}