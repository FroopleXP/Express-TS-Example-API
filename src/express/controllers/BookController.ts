import { Request, Response, NextFunction } from "express";
import IBookCreateDto from "../../dto/IBookCreateDto";
import ICreateNewBookDto from "../../dto/IBookCreateDto";

import IBookService from "../../services/interfaces/IBookService";
import IBook from "../../domain/entities/IBook";
import IGetAllBooksDto from "../../dto/IGetAllBooksDto";
import IBookDto from "../../dto/IBookDto";
import IGetBookByIdDto from "../../dto/IGetBookByIdDto";


export interface IBookController {
    getAllBooks(req: Request, res: Response<IGetAllBooksDto>, next: NextFunction): Promise<void>;
    createNewBook(req: Request<ICreateNewBookDto>, res: Response<IBookDto>, next: NextFunction): Promise<void>;
    getBookByUuid(req: Request<IGetBookByIdDto>, res: Response<IBookDto>, next: NextFunction): Promise<void>;
    deleteBookByUuid(req: Request<IGetBookByIdDto>, res: Response, next: NextFunction): Promise<void>;
}

export interface IBookControllerDeps {
    bookService: IBookService,
}

// TODO: Could this perhaps be written more like a React FC? BookController: Controller<IBookControllerDeps>
const BookController = (deps: IBookControllerDeps): IBookController => {

    const {
        bookService,
    } = deps;

    return {
        getAllBooks: async (req: Request, res: Response<IGetAllBooksDto>, next: NextFunction): Promise<void> => {
            try {

                const books: IBook[] = await bookService.getAllBooks();
                const mappedBooks: IBookDto[] = books.map((_book): IBookDto => {
                    return {
                        name: _book.title,
                        price: _book.price,
                        uuid: _book.uuid || ""
                    }
                });

                res.status(200).json({
                    books: mappedBooks
                });

            } catch (err) {
                next(err);
            }
        },
        createNewBook: async (req: Request<IBookCreateDto>, res: Response<IBookDto>, next: NextFunction): Promise<void> => {
            try {

                const body: IBookCreateDto = req.body;

                // Map the DTO into the domain entity
                const newBook: IBook = {
                    title: body.name,
                    price: body.price
                }

                const savedBook: IBook = await deps.bookService.createNewBook(newBook);

                res.status(201).json({
                    name: savedBook.title,
                    uuid: savedBook.uuid || "",
                    price: savedBook.price
                });

            } catch (err) {
                next(err);
            }
        },
        // TODO: Is there perhaps a better way to return rather than if / else branching?
        getBookByUuid: async (req: Request<IGetBookByIdDto>, res: Response<IBookDto>, next: NextFunction): Promise<void> => {
            try {

                const body: IGetBookByIdDto = req.params;
                const book: IBook = await bookService.getBookByUuid(body.uuid);

                if (!book) {
                    res.sendStatus(404);
                } else {
                    res.status(200).json({
                        name: book.title,
                        price: book.price,
                        uuid: book.uuid || ""
                    });
                }

            } catch (err) {
                next(err);
            }
        },
        deleteBookByUuid: async (req: Request<IGetBookByIdDto>, res: Response, next: NextFunction): Promise<void> => {
            try {

                const body: IGetBookByIdDto = req.params;

                await bookService.removeBookByUuid(body.uuid);

                res.sendStatus(200);

            } catch (err) {
                next(err);
            }
        }
    }
}

export default BookController;