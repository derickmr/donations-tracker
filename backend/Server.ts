import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Controller } from './controller/Controller';
import ONGController from './controller/ong/ONGController';
import {DefaultTokenGenerationService} from './service/authentication/impl/DefaultTokenGenerationService'
import DonationController from './controller/donation/DonationController';

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
        console.log(await new DefaultTokenGenerationService().generate())
    }
}

const server = new Server([
    new ONGController,
    new DonationController
]);

server.startup();