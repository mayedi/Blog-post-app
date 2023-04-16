import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import BlogpostRouter from "./router/BlogpostRouter";
import cors from 'cors';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    
    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync()
    }

    protected routes(): void {
        this.app.get('/', (_req: Request,res: Response) => {
            res.send("Welcome to Blog post API")
        });
        this.app.use("/api/blogpost", BlogpostRouter)
        this.app.use((_req: Request, res: Response) => {
            res.status(404).send({msg: "404 route not found"});
        });
          
    }
}

const port:number = 8000
const app = new App().app

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at port ${ port }` );
} );

export default app