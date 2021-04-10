import { NextFunction, Request, Response } from "express";

// TODO: Don't always show stack
const handleRouteErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).json({
        status: res.statusCode,
        message: "Something went wrong",
        stack: (process.env.NODE_ENV === "production") ? "🤩" : err.stack
    });
}

export default handleRouteErrors;