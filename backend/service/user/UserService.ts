import { User } from "../../db/entity/User";

export interface UserService {
    create(user: User): any;
    delete(email: string): any;
    get(email: string): any;
    getAll(): any;
    update(user: User): any;
}