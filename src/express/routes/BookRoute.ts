import Express from "express";
import { IBookController } from "../controllers/BookController";

export interface IBookRouteDeps {
    bookController: IBookController
}

const BookRoute = (deps: IBookRouteDeps): Express.Router => {

    const {
        bookController
    } = deps;

    const route: Express.Router = Express.Router();

    route.get("/", bookController.getAllBooks);
    route.post("/", bookController.createNewBook);
    route.get("/:uuid", bookController.getBookByUuid);
    route.delete("/:uuid", bookController.deleteBookByUuid);
    route.put("/:uuid", bookController.updateBookByUuid);

    return route;

}

export default BookRoute;