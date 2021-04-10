import IAuthor from "../../domain/entities/IAuthor";
import IRepository from "../interfaces/IRepository";

class AuthorRepository implements IRepository<IAuthor> {

    insert(obj: IAuthorCreateDto): Promise<void> {
        throw new Error("Method not implemented.");
    }

    removeById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<IAuthor> {
        throw new Error("Method not implemented.");
    }

    get(): Promise<IAuthor[]> {
        throw new Error("Method not implemented.");
    }

}

export default AuthorRepository;