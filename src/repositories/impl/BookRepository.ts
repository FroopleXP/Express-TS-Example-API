import IBook from "../../domain/entities/IBook";
import IBookRespository from "../interfaces/IBookRepository";

class BookRepository implements IBookRespository {

    private repo: IBook[];

    constructor() {
        this.repo = [];
    }
    getBookByUuid(uuid: string): Promise<IBook> {
        return Promise.resolve(this.repo.filter(book => book.uuid == uuid)[0]);
    }

    insert(entity: IBook): Promise<void> {
        this.repo.push({ ...entity, id: this.repo.length });
        return Promise.resolve();
    }

    removeById(id: number): Promise<void> {
        this.repo = [...this.repo.filter(book => book.id !== id)];
        return Promise.resolve();
    }

    getById(id: number): Promise<IBook> {
        return Promise.resolve(this.repo.filter(book => book.id == id)[0]);
    }

    get(): Promise<IBook[]> {
        return Promise.resolve(this.repo);
    }

}

export default BookRepository;