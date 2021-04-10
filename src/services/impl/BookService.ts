import uuid from "uuid";

import IBook from "../../domain/entities/IBook";
import IRepository from "../../repositories/interfaces/IRepository";
import IBookService from "../interfaces/IBookService";

export interface IBookServiceDeps {
    bookRepository: IRepository<IBook>
}

class BookService implements IBookService {

    private repo: IRepository<IBook>;

    constructor(deps: IBookServiceDeps) {
        this.repo = deps.bookRepository;
    }

    /*
        TODO: Improve validation. This is crude for now, I can defer this until later
        as it's just a demo.
    */
    public async createNewBook(book: IBook): Promise<void> {

        if (!book.title || !book.price) {
            throw new Error("You must specify a name and a price");
        }

        if (book.title.length < 5) {
            throw new Error("Book name must be greater than 5 characters");
        }

        const newBook: IBook = {
            ...book,
            uuid: this.generateUuid()
        }

        return this.repo.insert(newBook);

    }

    public getBookById(id: number): Promise<IBook> {
        return this.repo.getById(id);
    }

    public getAllBooks(): Promise<IBook[]> {
        return this.repo.get();
    }

    private generateUuid(): string {
        return uuid.v4();
    }

}

export default BookService;