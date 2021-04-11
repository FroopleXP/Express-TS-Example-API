class EntityInvalidException implements Error {
    public name: string = "ENTITY_INVALID_EXCEPTION";
    constructor(public message: string) { }
}

export default EntityInvalidException;