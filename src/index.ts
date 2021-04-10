import ExpressHttpService from "./http/impl/ExpressHttpService";
import IHttpService from "./http/interfaces/IHttpService";
import IBookCreateDto from "./interfaces/dto/IBookCreateDto";
import IBook from "./interfaces/IBook";
import BookRepository from "./repositories/impl/BookRepository";
import IRepository from "./repositories/interfaces/IRepository";
import BookService from "./services/impl/BookService";
import IBookService from "./services/interfaces/IBookService";

const bookRepository: IRepository<IBook, IBookCreateDto> = new BookRepository();
const bookService: IBookService = new BookService({ bookRepository });

(async () => {

    // Insert mock data
    const newBookZero: IBookCreateDto = {
        name: "This is a test book",
        price: 1000
    }

    const newBookOne: IBookCreateDto = {
        name: "Read this to become enlightened",
        price: 6900
    }

    await bookService.createNewBook(newBookZero);
    await bookService.createNewBook(newBookOne);

    // Create / start HTTP service 
    const httpService: IHttpService = new ExpressHttpService({ bookService });
    httpService.start(9000);

})();