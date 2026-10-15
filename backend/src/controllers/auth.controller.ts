import { type Request, type Response, type NextFunction } from "express";
import { SignUpService, AppError } from "../services/auth.service.js";

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {email, username, password} = req.body;
        const result = await SignUpService({email,username,password});
        return res.status(201).json(result);
    } catch(error){
        // Check if error is an instance of AppError: same structure as AppError
        if(error instanceof AppError){
            // If ĐÚNG là lỗi do dev chủ động tạo (AppError): return for client 
            return res.status(error.statusCode).json({
                error: {
                    code: error.code,
                    message: error.message,
                },
            });
            return;
        }
        next(error); // chuyển lỗi bất ngờ cho error.middleware.ts hiện tại
    }
};