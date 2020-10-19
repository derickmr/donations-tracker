import { DonationPaymentDetails } from "./model/DonationPaymentDetails";

export interface DonationService {
    submitDonation(donationPaymentDetails: DonationPaymentDetails): any;
}