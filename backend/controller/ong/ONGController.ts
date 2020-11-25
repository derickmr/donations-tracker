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
        this.router.post('/byId', this.getONGById);
        this.router.get('/:nextProjectID', this.getONGById.bind(this));
    }

    public async getAllONGS(request: Request, response: Response) {
        response.send(await new DefaultONGService().getAllOngs());
    };

    public async getNextOngs(request: Request, response: Response) {
        response.send(await new DefaultONGService().getNextOngs(request.params.nextProjectId));
    };

    public async getONGById(request: Request, response: Response) {
        response.send(await new DefaultONGService().getOngById(request.body.ongId));
    }
}

export default ONGController;