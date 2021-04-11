import IBook from "../../domain/entities/IBook";
import IBookRespository from "../interfaces/IBookRepository";

class BookRepository implements IBookRespository {

    private repo: IBook[];

    constructor() {
        this.repo = [];
    }

    async updateById(id: number, update: IBook): Promise<IBook> {
        const book: IBook = await this.getById(id);
        if (!book) {
            return Promise.reject(new Error("Book does not exist"));
        }

        const bookUpdate: IBook = { ...book, ...update, id: book.id };
        const _repo: IBook[] = [...this.repo]

        this.repo = _repo.map((_book) => {
            if (_book.id === id) {
                return bookUpdate;
            }
            return _book;
        });

        return Promise.resolve(bookUpdate);

    }

    getBookByUuid(uuid: string): Promise<IBook> {
        return Promise.resolve(this.repo.filter(book => book.uuid == uuid)[0]);
    }

    insert(entity: IBook): Promise<IBook> {
        const newEntity: IBook = { ...entity, id: this.repo.length };
        this.repo.push(newEntity);
        return Promise.resolve(newEntity);
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