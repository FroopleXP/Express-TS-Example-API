import IBook from "./domain/entities/IBook";
import ExpressHttpService from "./http/impl/ExpressHttpService";
import IHttpService from "./http/interfaces/IHttpService";
import BookRepository from "./repositories/impl/BookRepository";
import IBookRespository from "./repositories/interfaces/IBookRepository";
import BookService from "./services/impl/BookService";
import IBookService from "./services/interfaces/IBookService";

const bookRepository: IBookRespository = new BookRepository();
const bookService: IBookService = new BookService({ bookRepository });

(async () => {

    try {

        // Insert mock data
        const newBookZero: IBook = {
            title: "This is a test book",
            price: 1000
        }

        await bookService.createNewBook(newBookZero);

        // Create / start HTTP service 
        const httpService: IHttpService = new ExpressHttpService({ bookService });
        httpService.start(9000);

    } catch (err: any) {
        console.error(err.stack);
    }

})();