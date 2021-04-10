import IBookCreateDto from "../../interfaces/dto/IBookCreateDto";
import IBook from "../../interfaces/IBook";

interface IBookService {
    createNewBook(book: IBookCreateDto): Promise<void>;
    getBookById(id: number): Promise<IBook>;
    getAllBooks(): Promise<IBook[]>;
}

export default IBookService;