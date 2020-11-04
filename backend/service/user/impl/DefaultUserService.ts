import { User } from '../../../db/entity/User';
import { DefaultUserDao } from '../../../db/user/impl/DefaultUserDao';
import { UserDao } from '../../../db/user/UserDao';
import { UserService } from './../UserService';

export class DefaultUserService implements UserService {
    userDao: UserDao;

    constructor() {
        this.userDao = new DefaultUserDao();
    }
    create(user: User) {
        this.userDao.create(user);
    }
    delete(email: string) {
        this.userDao.delete(email);
    }
    async get(email: string) {
        var user = await this.userDao.get(email)
        return user;
    }
    async getAll() {
        return await this.userDao.getAll();
    }
    async update(user: User) {
        return await this.userDao.update(user);
    }
}