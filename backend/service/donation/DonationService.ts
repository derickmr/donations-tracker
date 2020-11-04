import { DonationForm } from "./model/DonationForm";
import { DonationPaymentDetails } from "./model/DonationPaymentDetails";
import { SubmitDonationRequest } from "./model/SubmitDonationRequest";

export interface DonationService {
    submitDonation(submitDonationRequest: SubmitDonationRequest): any;
    saveDonation(form: DonationForm): any;
    getMockedUser(): any;
}