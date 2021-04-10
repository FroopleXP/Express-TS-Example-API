interface IRepository<T, D> {
    insert(dto: D): Promise<void>;
    removeById(id: number): Promise<void>;
    getById(id: number): Promise<T>;
    get(): Promise<T[]>;
}

export default IRepository;