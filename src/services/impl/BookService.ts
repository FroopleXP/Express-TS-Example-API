import { v4 as uuidv4 } from "uuid";
import EntityInvalidException from "../../common/exceptions/EntityInvalidException";
import EntityNotFoundException from "../../common/exceptions/EntityNotFoundException";

import IBook from "../../domain/entities/IBook";
import IBookRespository from "../../repositories/interfaces/IBookRepository";
import IBookService from "../interfaces/IBookService";

export interface IBookServiceDeps {
    bookRepository: IBookRespository
}

class BookService implements IBookService {

    constructor(private readonly _deps: IBookServiceDeps) { }

    async updateBookByUuid(uuid: string, update: IBook): Promise<IBook> {

        const book: IBook = await this.getBookByUuid(uuid);

        console.log(book);

        if (!book || book.id === undefined) {
            throw new EntityNotFoundException("Book does not exist with that UUID");
        }

        return await this.updateBookById(book.id, update);

    }

    async updateBookById(id: number, update: IBook): Promise<IBook> {

        const currentBook: IBook = await this.getBookById(id);

        if (!currentBook) {
            throw new EntityNotFoundException("Book does not exist");
        }

        if (!update.title || !update.price) {
            throw new EntityInvalidException("You must specify a name and a price");
        }

        if (update.title.length < 5) {
            throw new EntityInvalidException("Book name must be greater than 5 characters");
        }

        return this._deps.bookRepository.updateById(id, { ...update, uuid: currentBook.uuid });

    }

    async removeBookByUuid(uuid: string): Promise<void> {

        const book: IBook = await this.getBookByUuid(uuid);

        if (!book || book.id === undefined) {
            throw new EntityNotFoundException("Book does not exist");
        }

        return this._deps.bookRepository.removeById(book.id);

    }

    /*
        TODO: Improve validation. This is crude for now, I can defer this until later
        as it's just a demo.
        TODO: Port it out - we'll also need it for updating
    */
    public async createNewBook(book: IBook): Promise<IBook> {

        if (!book.title || !book.price) {
            throw new EntityInvalidException("You must specify a name and a price");
        }

        if (book.title.length < 5) {
            throw new EntityInvalidException("Book name must be greater than 5 characters");
        }

        const newBook: IBook = {
            ...book,
            uuid: uuidv4()
        }

        return this._deps.bookRepository.insert(newBook);

    }

    public getBookById(id: number): Promise<IBook> {
        return this._deps.bookRepository.getById(id);
    }

    public getBookByUuid(uuid: string): Promise<IBook> {
        return this._deps.bookRepository.getBookByUuid(uuid);
    }

    public getAllBooks(): Promise<IBook[]> {
        return this._deps.bookRepository.get();
    }
}

export default BookService;