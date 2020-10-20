import { DonationPaymentDetails } from "./DonationPaymentDetails";

export class SubmitDonationRequest {
    refcode?: string;
    transactionId?: string;
    email: string;
    amount: number;
    project: {
        id: string;
    };
    signupForGGNewsletter?: boolean;
    signupForCharityNewsletter?: boolean;
    ipAddress?: string;
    userAgent?: string;
    payment_detail: DonationPaymentDetails;

    constructor(email: string, amount: number, project: any, payment_detail: DonationPaymentDetails) {
        this.email = email;
        this.amount = amount;
        this.project = project;
        this.payment_detail = payment_detail;
    }
}