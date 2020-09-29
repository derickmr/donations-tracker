import { Controller } from "../Controller";
import { Request, Response } from 'express';
import {DefaultONGService} from '../../service/ongs/impl/DefaultONGService';

import express from 'express';

class ONGController implements Controller {
    readonly CONTEXT_PATH: string = "/ong"
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.get('/', this.getAllONGS);
        this.router.get('/byId', this.getONGById);
    }

    public async getAllONGS(request: Request, response: Response) {
        response.send(await new DefaultONGService().getAllOngs());
    };

    public async getNextOngs(request: Request, response: Response) {
        response.send(await new DefaultONGService().getNextOngs(request.body.nextProjectID));
    };

    public async getONGById(request: Request, response: Response) {
        response.send(await new DefaultONGService().getOngById(request.body.ongId));
    }
}

export default ONGController;