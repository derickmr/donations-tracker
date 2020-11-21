import { User } from "../../entity/User";
import { UserDao } from "../UserDao";
import "reflect-metadata";
import { createConnection, UpdateResult } from "typeorm";

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
        console.log("Saved a new user with email: " + user.email);
    }
    async delete(email: string) {
        this.connection.getRepository(User).delete({ email: email });
        console.log("Deleted user with email: " + email);
    }
    async get(email: string): Promise<User> {
<<<<<<< HEAD
        return new Promise<User>(async (resolve, reject) => {
=======
        return new Promise(async (resolve, reject) => {
>>>>>>> cc0fdfb4491f8c6a5a21847ebdaf877679585c52
            const user: User = await this.connection.getRepository(User).findOne({ email: email } as User) as User;
            console.log("Retrieved user with email " + email + " from the database.");
            resolve(user);
        }) as Promise<User>;
    }
    async getAll(): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            console.log("Retrieving users from the database...");
            const users: User[] = await this.connection.manager.find(User) as User[];
            console.log("Retrieving users: ", users);
            resolve(users)
        });
    }
    async update(user: User): Promise<User> {
        return new Promise(async (resolve, reject) => {
            console.log("Updating user in the database...");
            var updateResult: UpdateResult = await this.connection.getRepository(User)
                .update({email: user.email }, user);

            if (updateResult.affected && updateResult.affected > 0) {
                console.log("Updated user with email: " + user.email);
                resolve(user);
            } else {
                resolve(undefined);
            }
        });
    }
}