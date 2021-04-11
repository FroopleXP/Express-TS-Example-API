import { NextFunction, Request, Response } from "express";
import EntityInvalidException from "../../common/exceptions/EntityInvalidException";
import EntityNotFoundException from "../../common/exceptions/EntityNotFoundException";
import IErrorDto from "../../dto/IErrorDto";

// TODO: Come up with better solution than branching, you fucker!
const handleRouteErrors = (err: Error, req: Request, res: Response<IErrorDto>, next: NextFunction): void => {

    if (err instanceof EntityNotFoundException) {
        res.sendStatus(404);

    } else if (err instanceof EntityInvalidException) {
        res.status(400).json({ message: err.message });

    } else {

        let errorResponse: IErrorDto = {
            message: "Something went wrong"
        }

        if (process.env.NODE_ENV === "development") {
            errorResponse = { ...errorResponse, stack: err.stack }
        }

        res.status(500).json(errorResponse);
    }
}

export default handleRouteErrors;