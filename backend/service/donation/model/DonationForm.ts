import { Double } from "typeorm";

export class DonationForm {
    projectId: string;
    firstname: string;
    lastname: string;
    email: string;
    amount: Double;
}