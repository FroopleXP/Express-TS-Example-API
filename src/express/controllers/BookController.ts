import { Request, Response, NextFunction } from "express";
import IBookCreateDto from "../../interfaces/dto/IBookCreateDto";
import ICreateNewBookDto from "../../interfaces/dto/IBookCreateDto";

import IBookService from "../../services/interfaces/IBookService";

export interface IBookController {
    getAllBooks(req: Request, res: Response, next: NextFunction): Promise<void>;
    createNewBook(req: Request<ICreateNewBookDto>, res: Response, next: NextFunction): Promise<void>;
}

export interface IBookControllerDeps {
    bookService: IBookService
}

// TODO: Could this perhaps be written more like a React FC? BookController: Controller<IBookControllerDeps>
const BookController = (deps: IBookControllerDeps): IBookController => {

    return {
        getAllBooks: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                res.status(200).json({ status: res.statusCode, books: await deps.bookService.getAllBooks() });
            } catch (err) {
                next(err);
            }
        },
        createNewBook: async (req: Request<IBookCreateDto>, res: Response, next: NextFunction): Promise<void> => {
            try {
                await deps.bookService.createNewBook(req.body);
                res.status(201).json({ status: res.statusCode });
            } catch (err) {
                next(err);
            }
        }
    }
}

export default BookController;