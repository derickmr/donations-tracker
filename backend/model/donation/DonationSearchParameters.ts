import { Double } from "typeorm";

export class DonationSearchParameters {
    amountLessThan: number;
    amountGreaterThan: number;
    donationDateLessThan: Date;
    donationDateGreaterThan: Date;
    projectId: string;
}