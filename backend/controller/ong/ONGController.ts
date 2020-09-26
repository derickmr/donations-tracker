import { Controller } from "../Controller";
import { Request, Response } from 'express';

import express from 'express';

class ONGController implements Controller {
    readonly CONTEXT_PATH: string = "/ong"
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.get('/', this.getAllONGS);
    }

    public getAllONGS(request: Request, response: Response) {
        response.send('Donations Tracker!');
    };
}

export default ONGController;