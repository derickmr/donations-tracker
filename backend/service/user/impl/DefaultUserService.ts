import { User } from '../../../db/entity/User';
import { DefaultUserDao } from '../../../db/user/impl/DefaultUserDao';
import { UserDao } from '../../../db/user/UserDao';
import { UserService } from './../UserService';

export class DefaultUserService implements UserService {
    userDao: UserDao;

    constructor() {
        this.userDao = new DefaultUserDao();
    }
    async login(email: string, password: string): Promise<User> {
        var user: User = await this.get(email);
        return new Promise((resolve, reject) => { 
            if (user && email === user.email && password === user.password) {
                resolve(user);
            } else {
                reject("Invalid login");
            }
        });
    }
    create(user: User) {
        this.userDao.create(user);
    }
    delete(email: string) {
        this.userDao.delete(email);
    }
    async get(email: string): Promise<User> {
        var user: User = await this.userDao.get(email) as User;
        return new Promise((resolve, reject) => { resolve(user) });
    }
    async getAll(): Promise<User[]> {
        var users: User[] = await this.userDao.getAll();
        return new Promise((resolve, reject) => { resolve(users) });

    }
    async update(user: User): Promise<User> {
        var updatedUser: User = await this.userDao.update(user)
        return new Promise((resolve, reject) => { resolve(updatedUser) });
    }
}