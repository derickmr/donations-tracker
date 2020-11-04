import { User } from "../../entity/User";
import { UserDao } from "../UserDao";
import "reflect-metadata";
import { createConnection } from "typeorm";

export class DefaultUserDao implements UserDao {
    connection: any;

    constructor() {
        this.initiateConnection();
    }

    async initiateConnection() {
        this.connection = await createConnection();

    }
    async create(user: User) {
        console.log("Inserting a new user into the database.");
        await this.connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);
    }
    async delete(email: string) {
        this.connection.getRepository(User).delete({ email: email });
        console.log("Deleted user with email: " + email);
    }
    async get(email: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            const user: User = await this.connection.getRepository(User).findOne({ email: email }) as User;
            console.log("Retrieved user with email " + email + " from the database.");
            resolve(user);
        });
    }
    async getAll(): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            console.log("Retrieving users from the database...");
            const users: User[] = await this.connection.manager.find(User);
            console.log("Retrieving users: ", users);
            resolve(users)
        });
    }
    async update(user: User): Promise<User> {
        return new Promise(async (resolve, reject) => {
            console.log("Updating user in the database...");
            await this.connection.manager.save(user);
            console.log("Updated user with id: " + user.id);
            resolve(user);
        });
    }
}