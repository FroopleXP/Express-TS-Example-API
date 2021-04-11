import IBook from "../../domain/entities/IBook";

interface IBookService {
    createNewBook(book: IBook): Promise<void>;
    getBookById(id: number): Promise<IBook>;
    getBookByUuid(uuid: string): Promise<IBook>;
    getAllBooks(): Promise<IBook[]>;
}

export default IBookService;