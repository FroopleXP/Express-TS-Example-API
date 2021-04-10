interface IRepository<T> {
    insert(entity: T): Promise<void>;
    removeById(id: number): Promise<void>;
    getById(id: number): Promise<T>;
    get(): Promise<T[]>;
}

export default IRepository;