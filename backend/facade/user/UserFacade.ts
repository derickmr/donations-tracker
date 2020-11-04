import { UserDTO } from "../dto/UserDTO";

export interface UserFacade {
    create(userDTO: UserDTO): any;
    delete(email: string): any;
    update(userDTO: UserDTO): any;
    get(email: string): any;
    getAll(): any;
}