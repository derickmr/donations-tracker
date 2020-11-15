import { Double } from "typeorm";
import { Donation } from "../../../db/entity/Donation";
import { User } from "../../../db/entity/User";
import { DefaultUserService } from "../../../service/user/impl/DefaultUserService";
import { UserService } from "../../../service/user/UserService";
import { DonationDTO } from "../../dto/DonationDTO";
import { UserDTO } from "../../dto/UserDTO";
import { UserFacade } from "../UserFacade";

export class DefaultUserFacade implements UserFacade {
    userService: UserService;

    constructor() {
        this.userService = new DefaultUserService();
    }
    async login(email: string, password: string): Promise<UserDTO> {
        var user: User = await this.userService.login(email, password);
        try {
            return new Promise((resolve, reject) => {
                resolve(this.convertUserToUserDTO(user))
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject("Authentication not possible");
            });
        }
    }
    create(userDTO: UserDTO) {
        this.userService.create(Object.assign(new User(), userDTO));
    }
    delete(email: string) {
        this.userService.delete(email);
    }
    async get(email: string): Promise<UserDTO> {
        var user: User = await this.userService.get(email);
        return new Promise((resolve, reject) => {
            if (user) {
                resolve(this.convertUserToUserDTO(user))
            } else {
                reject("No user found.");
            }
        });
    }
    async getAll(): Promise<UserDTO[]> {
        var users: User[] = await this.userService.getAll();
        var userDTOs: UserDTO[] = [];

        users.forEach(user => {
            userDTOs.push(this.convertUserToUserDTO(user));
        })
        return new Promise((resolve, reject) => { resolve(userDTOs) });
    }
    async update(userDTO: UserDTO): Promise<UserDTO> {
        var user: User = await this.userService.update(Object.assign(new User(), userDTO));
        return new Promise((resolve, reject) => {
            if (user) {
                resolve(this.convertUserToUserDTO(user))
            } else {
                reject("Couldn't find user to update.");
            }
        });
    }

    convertUserToUserDTO(user: User): UserDTO {
        var userDTO: UserDTO = new UserDTO();
        userDTO.email = user.email;
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.donations = [];

        if (user.donations) {
            user.donations.forEach(donation => {
                userDTO.donations.push(this.convertDonationToDonationDTO(donation));
            })
        }
        return userDTO;
    }

    convertDonationToDonationDTO(donation: Donation): DonationDTO {
        var donationDto: DonationDTO = new DonationDTO();
        donationDto.id = donation.id;
        donationDto.amount = donation.amount.valueOf();
        donationDto.projectId = donation.projectId;
        return donationDto;
    }
}