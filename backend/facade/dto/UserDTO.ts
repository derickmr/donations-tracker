import { DonationDTO } from "./DonationDTO";

export class UserDTO {
    firstName: string;
    lastName: string;
    email: string;
    donations: DonationDTO[];

    constructor() { }
}