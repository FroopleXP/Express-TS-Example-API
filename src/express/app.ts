import Express, { Router } from "express";
import IBookService from "../services/interfaces/IBookService";
import handleRouteErrors from "./utils/handleRouteErrors";
import BookController, { IBookController } from "./controllers/BookController";
import BookRoute from "./routes/BookRoute";

import morgan, { format } from "morgan";

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
    if (process.env.NODE_ENV === "development") {
        app.use(morgan("tiny"));
    }

    app.use(Express.json());
    app.use(Express.urlencoded({ extended: false }));

    // Registering routes
    app.use("/books", bookRoute);

    // Error handler
    app.use(handleRouteErrors);

    return app;

}

export default ExpressApp;