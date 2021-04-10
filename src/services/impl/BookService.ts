import IBookCreateDto from "../../interfaces/dto/IBookCreateDto";
import IBook from "../../interfaces/IBook";
import IRepository from "../../repositories/interfaces/IRepository";
import IBookService from "../interfaces/IBookService";

export interface IBookServiceDeps {
    bookRepository: IRepository<IBook, IBookCreateDto>;
}

class BookService implements IBookService {

    private repo: IRepository<IBook, IBookCreateDto>;

    constructor(deps: IBookServiceDeps) {
        this.repo = deps.bookRepository;
    }

    /*
        TODO: Improve validation. This is crude for now, I can defer this until later
        as it's just a demo.
    */
    async createNewBook(book: IBookCreateDto): Promise<void> {

        if (!book.name || !book.price) {
            throw new Error("You must specify a name and a price");
        }

        // Validation
        if (book.name.length < 5) {
            throw new Error("Book name must be greater than 5 characters");
        }

        await this.repo.insert(book);

    }

    getBookById(id: number): Promise<IBook> {
        return this.repo.getById(id);
    }

    getAllBooks(): Promise<IBook[]> {
        return this.repo.get();
    }

}

export default BookService;