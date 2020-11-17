import { UserDTO } from "../dto/UserDTO";

export interface UserFacade {
    login(email: string, password: string): Promise<UserDTO>;
    create(userDTO: UserDTO): any;
    delete(email: string): any;
    update(userDTO: UserDTO): Promise<UserDTO>;
    get(email: string): Promise<UserDTO>;
    getAll(): Promise<UserDTO[]>;
}