import IBook from "../../domain/entities/IBook";

interface IBookService {
    createNewBook(book: IBook): Promise<IBook>;
    getBookById(id: number): Promise<IBook>;
    getBookByUuid(uuid: string): Promise<IBook>;
    getAllBooks(): Promise<IBook[]>;
}

export default IBookService;