import express from "express";
const { Request, Response, NextFunction } = express;

export class AppError extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number) {  
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor); 
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Resource not found") {
        super(message, 404);
    }   
}

export class ValidationError extends AppError {
    public errors: any[];
    constructor(message: string = "Validation failed", errors: any[] = []) {
        super(message, 400);
        this.errors = errors;
    }
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const response = {
        status: "error",
        message: err.message || "Internal Server Error",
    };
    if (err instanceof ValidationError) {
        (response as any).errors = err.errors;
    }   
    res.status(statusCode).json(response);
};

export default errorHandler;