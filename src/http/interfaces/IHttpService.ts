interface IHttpService {
    start(port: number): void;
    stop(): void;
}

export default IHttpService;