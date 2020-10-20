import { DonationPaymentDetails } from "./model/DonationPaymentDetails";
import { SubmitDonationRequest } from "./model/SubmitDonationRequest";

export interface DonationService {
    submitDonation(submitDonationRequest: SubmitDonationRequest): any;
}