import IHttpService from "../interfaces/IHttpService";
import Http from "http";
import IBookService from "../../services/interfaces/IBookService";
import ExpressApp from "../../express/app";

export interface IExpressHttpServiceDeps {
    bookService: IBookService
}

class ExpressHttpService implements IHttpService {

    private httpService: Http.Server;

    constructor(deps: IExpressHttpServiceDeps) {
        this.httpService = Http.createServer(
            ExpressApp({ bookService: deps.bookService })
        );
    }

    start(port: number): void {
        this.httpService.listen(port, () => {
            console.log(`HTTP service started on port => ${port}`);
        });
    }

    stop(): void {
        this.httpService.close();
    }

}

export default ExpressHttpService;