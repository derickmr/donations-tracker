import { UserDTO } from "../dto/UserDTO";

export interface UserFacade {
    create(userDTO: UserDTO): any;
    delete(email: string): any;
    update(userDTO: UserDTO): Promise<UserDTO>;
    get(email: string): Promise<UserDTO>;
    getAll(): Promise<UserDTO[]>;
}