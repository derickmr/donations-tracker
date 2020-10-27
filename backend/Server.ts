import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Controller } from './controller/Controller';
import ONGController from './controller/ong/ONGController';
import {DefaultTokenGenerationService} from './service/authentication/impl/DefaultTokenGenerationService'
import DonationController from './controller/donation/DonationController';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./db/entity/User";

class Server {
    application: express.Application;
    router: express.Router = express.Router();
    defaultPort: any;

    constructor(controllers: Array<Controller>) {
        this.application = express();
        this.router = express.Router();
        this.defaultPort = process.env.PORT || 3000;
        this.loadConfiguration();
        this.loadRoutes(controllers);
    }

    private loadConfiguration() {
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.application.use('/', this.router);
    }

    private loadRoutes(controllers: Array<Controller>) {
        this.loadRootRoute();
        controllers.forEach(controller => {
            this.application.use(controller.CONTEXT_PATH, controller.router);
        })
    }

    private loadRootRoute() {
        this.router.get('/', (request: Request, response: Response) => {
            response.send('Donations Tracker!');
        });
    }

    public async startup() {
        this.application.listen(this.defaultPort, () => console.log(`Started app at http://localhost:${this.defaultPort}`));
        console.log(await new DefaultTokenGenerationService().generate());

        createConnection().then(async connection => {

            console.log("Inserting a new user into the database...");
            const user = new User();
            user.firstName = "Timber";
            user.lastName = "Saw";
            user.age = 25;
            await connection.manager.save(user);
            console.log("Saved a new user with id: " + user.id);

            console.log("Loading users from the database...");
            const users = await connection.manager.find(User);
            console.log("Loaded users: ", users);

            console.log("Here you can setup and run express/koa/any other framework.");

        }).catch(error => console.log(error));

    }
}

const server = new Server([
    new ONGController,
    new DonationController
]);

server.startup();