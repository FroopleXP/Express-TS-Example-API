import IBook from "../../domain/entities/IBook";
import IRepository from "./IRepository";

interface IBookRespository extends IRepository<IBook> {
    getBookByUuid(uuid: string): Promise<IBook>
}

export default IBookRespository;