import { User } from "../../../db/entity/User";
import { DefaultUserService } from "../../../service/user/impl/DefaultUserService";
import { UserService } from "../../../service/user/UserService";
import { UserDTO } from "../../dto/UserDTO";
import { UserFacade } from "../UserFacade";

export class DefaultUserFacade implements UserFacade {
    userService: UserService;

    constructor() {
        this.userService = new DefaultUserService();
    }
    create(userDTO: UserDTO) {
        this.userService.create(Object.assign(new User(), userDTO));
    }
    delete(email: string) {
        this.userService.delete(email);
    }
    async get(email: string) {
        var user: User = await this.userService.get(email);
        return this.convertUserToUserDTO(user);
    }
    async getAll() {
        var users: User[] = await this.userService.getAll();
        var userDTOs: UserDTO[] = [];

        users.forEach(user => {
            userDTOs.push(this.convertUserToUserDTO(user));
        })
        return userDTOs;
    }
    async update(userDTO: UserDTO) {
        var user: User = await this.userService.update(Object.assign(new User(), userDTO));
        return this.convertUserToUserDTO(user);
    }

    convertUserToUserDTO(user: User): UserDTO {
        var userDTO: UserDTO = new UserDTO();
        userDTO.email = user.email;
        userDTO.age = user.age;
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        console.log(userDTO)
        return userDTO;
    }
}