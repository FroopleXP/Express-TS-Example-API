class EntityNotFoundException implements Error {
    public name = "ENTITY_NOT_FOUND";
    constructor(public message: string) { }
}

export default EntityNotFoundException;

