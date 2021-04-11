import IBook from "../../domain/entities/IBook";

interface IBookService {
    createNewBook(book: IBook): Promise<IBook>;
    getBookById(id: number): Promise<IBook>;
    removeBookByUuid(uuid: string): Promise<void>;
    getBookByUuid(uuid: string): Promise<IBook>;
    getAllBooks(): Promise<IBook[]>;
}

export default IBookService;