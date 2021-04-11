import IBook from "../../domain/entities/IBook";

interface IBookService {
    createNewBook(book: IBook): Promise<IBook>;
    getBookById(id: number): Promise<IBook>;
    getBookByUuid(uuid: string): Promise<IBook>;
    updateBookById(id: number, update: IBook): Promise<IBook>;
    updateBookByUuid(uuid: string, update: IBook): Promise<IBook>;
    removeBookByUuid(uuid: string): Promise<void>;
    getAllBooks(): Promise<IBook[]>;
}

export default IBookService;