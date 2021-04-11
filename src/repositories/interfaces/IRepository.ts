interface IRepository<T> {
    insert(entity: T): Promise<T>;
    removeById(id: number): Promise<void>;
    getById(id: number): Promise<T>;
    get(): Promise<T[]>;
    updateById(id: number, update: T): Promise<T>;
}

export default IRepository;