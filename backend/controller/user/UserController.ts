import { Controller } from "../Controller";
import { Request, Response } from 'express';
import express from 'express';
import { UserFacade } from "../../facade/user/UserFacade";
import { DefaultUserFacade } from "../../facade/user/impl/DefaultUserFacade";
import { UserDTO } from "../../facade/dto/UserDTO";
import { AbstractController } from "../AbtractController";

const jwt = require('jsonwebtoken');

class UserController extends AbstractController implements Controller {
    readonly CONTEXT_PATH: string = "/user"
    userFacade: UserFacade;
    router: express.Router;

    constructor() {
        super();
        this.router = express.Router();
        this.router.post('', this.create.bind(this));
        this.router.put('', this.update.bind(this));
        this.router.delete('', this.delete.bind(this));
        this.router.get('', this.get.bind(this));
        this.router.get('/all', this.getAll.bind(this));
        this.router.post('/login', this.login.bind(this));
        this.router.post('/logout', this.logout.bind(this));
        this.userFacade = new DefaultUserFacade();
    }

    public async login(request: Request, response: Response) {
        this.validateBody(request, response);
        try {
            var userDTO: UserDTO = await this.userFacade.login(request.body.email, request.body.password);
            var token = jwt.sign({id: userDTO.email}, "AUTH_SECRET_DONATIONS_TRACKER", {
                expiresIn: 1200
            });
            userDTO.isAuthenticated = true;
            userDTO.token = token;
            response.send(userDTO);
        } catch (error) {
            response.status(400).send("Login failed, cause: " + error)
        }
    }

    public async logout(request: Request, response: Response) {
        this.validateBody(request, response);
        try {
            var userDTO: UserDTO = await this.userFacade.get(request.body.email);
            userDTO.token = null;
            userDTO.isAuthenticated = false;
            response.send(userDTO);
        } catch (error) {
            response.status(400).send("Unable to log out, cause: " + error)
        }
    }

    public create(request: Request, response: Response) {
        this.validateBody(request, response);
        this.userFacade.create(Object.assign(new UserDTO, request.body));
        response.sendStatus(201)
    }

    public async update(request: Request, response: Response) {
        this.validateBody(request, response);
        try {
            var userDTO: UserDTO = await this.userFacade.update(Object.assign(new UserDTO, request.body));
            response.send(userDTO);
        } catch (error) {
            response.status(404).send("Couldn't find user to update, cause: " + error)
        }
    }

    public delete(request: Request, response: Response) {
        this.validateBody(request, response);
        this.userFacade.delete(request.body.email);
        response.sendStatus(200);
    }

    public async get(request: Request, response: Response) {
        this.validateBody(request, response);
        try {
            var userDTO: UserDTO = await this.userFacade.get(request.body.email);
            response.send(userDTO);
        } catch (error) {
            response.status(404).send("No user found for email" + request.body.email + ", cause: " + error)
        }
    }

    public async getAll(request: Request, response: Response) {
        var userDTOs: UserDTO[] = await this.userFacade.getAll();

        if (userDTOs) {
            response.send(userDTOs);
        } else {
            response.status(404).send("No users found");
        }
    }

    public validateBody(request: Request, response: Response) {
        if (!request.body) {
            response.status(400).send("Body can not be empty");
        }
    }
}

export default UserController;