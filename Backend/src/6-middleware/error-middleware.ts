import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/status-code";
import { RouteNotFound } from "../3-models/client-errors";
import { appConfig } from "../2-utils/app-config";

class ErrorMiddleware {

    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
        console.log(err);

        const status = err.status || StatusCode.InternalServerError;
        const isCrash = status >= 500 && status <= 599;
        const message = appConfig.isProduction && isCrash ? "Some error, please try again." : err.message;

        response.status(status).json({ message });
    }

    public routeNotFound(request: Request, response: Response, next: NextFunction): void {
        const err = new RouteNotFound(request.method, request.originalUrl);
        next(err); 
    }

}

export const errorMiddleware = new ErrorMiddleware();
