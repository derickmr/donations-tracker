import { User } from "../../db/entity/User";

export interface UserService {
    create(user: User): any;
    delete(email: string): any;
    get(email: string): Promise<User>;
    getAll(): Promise<User[]>;
    update(user: User): Promise<User>;
}