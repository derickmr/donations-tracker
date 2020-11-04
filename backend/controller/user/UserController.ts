import { Controller } from "../Controller";
import { Request, Response } from 'express';
import express from 'express';
import { UserFacade } from "../../facade/user/UserFacade";
import { DefaultUserFacade } from "../../facade/user/impl/DefaultUserFacade";
import { UserDTO } from "../../facade/dto/UserDTO";
import bodyParser from 'body-parser';


class UserController implements Controller {
    readonly CONTEXT_PATH: string = "/user"
    userFacade: UserFacade;
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.use(this.interceptRequest);
        this.router.post('', this.create.bind(this));
        this.router.put('', this.update.bind(this));
        this.router.delete('', this.delete.bind(this));
        this.router.get('', this.get.bind(this));
        this.router.get('/all', this.getAll.bind(this));
        this.userFacade = new DefaultUserFacade();
    }

    public create(request: Request, response: Response) {
        this.userFacade.create(Object.assign(new UserDTO, request.body));
        response.sendStatus(201)
    }

    public update(request: Request, response: Response) {
        var userDTO: UserDTO = this.userFacade.create(Object.assign(new UserDTO, request.body));
        response.send(userDTO);
    }

    public delete(request: Request, response: Response) {
        this.userFacade.create(request.body.email);
        response.sendStatus(200);
    }

    public get(request: Request, response: Response) {
        var userDTO: UserDTO = this.userFacade.get(request.body.email);
        console.log(JSON.stringify(userDTO))
        response.send(userDTO);
    }

    public getAll(request: Request, response: Response) {
        var userDTOs: UserDTO[] = this.userFacade.get(request.body.email);
        response.send(userDTOs);
    }

    public interceptRequest(request: Request, response: Response, next: any) {
        if (!request.body) {
            response.status(400).send("Body can not be empty");
        }
        next();
    }
}

export default UserController;