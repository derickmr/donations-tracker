import { User } from "../entity/User";

export interface UserDao {
    create(user: User): any;
    delete(email: string): any;
    get(email: string): Promise<User>;
    getAll(): Promise<User[]>;
    update(user: User): Promise<User>;
}