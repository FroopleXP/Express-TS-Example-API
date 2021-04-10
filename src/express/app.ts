import Express, { Router } from "express";
import IBookService from "../services/interfaces/IBookService";
import { json } from "body-parser";
import handleRouteErrors from "./utils/handleRouteErrors";
import BookController, { IBookController } from "./controllers/BookController";
import BookRoute from "./routes/BookRoute";

export interface IExpressAppDeps {
    bookService: IBookService
}

const ExpressApp = (deps: IExpressAppDeps): Express.Application => {

    const {
        bookService
    } = deps;

    const app: Express.Application = Express();

    const bookController: IBookController = BookController({ bookService });
    const bookRoute: Router = BookRoute({ bookController });

    // App setup
    app.use(json()) // <--- How body-parser likes things - kinda icky...

    // Registering routes
    app.use("/books", bookRoute);

    // Error handler
    app.use(handleRouteErrors);

    return app;

}

export default ExpressApp;