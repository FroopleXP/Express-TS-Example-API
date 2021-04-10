import IBookCreateDto from "../../interfaces/dto/IBookCreateDto";
import IBook from "../../interfaces/IBook";
import IRepository from "../interfaces/IRepository";

class BookRepository implements IRepository<IBook, IBookCreateDto> {

    private repo: IBook[];

    constructor() {
        this.repo = [];
    }

    insert(dto: IBookCreateDto): Promise<void> {

        /*
            TODO: I'm not sure this is the best place for this mapping. In this case it works
            as we can generate the ID here. However, when switching to a real DB we have to rely
            on it to create the ID in which case this wouldn't work.
        */
        const newBook: IBook = {
            id: this.repo.length,
            title: dto.name,
            price: dto.price
        }

        this.repo.push(newBook);

        return Promise.resolve();
    }

    removeById(id: number): Promise<void> {
        this.repo = [...this.repo.filter(book => book.id !== id)];
        return Promise.resolve();
    }

    getById(id: number): Promise<IBook> {
        return Promise.resolve(this.repo.filter(book => book.id === id)[0]);
    }

    get(): Promise<IBook[]> {
        return Promise.resolve(this.repo);
    }

}

export default BookRepository;