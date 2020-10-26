import { Controller } from "../Controller";
import { Request, Response } from 'express';
import { DonationPaymentDetails } from "../../service/donation/model/DonationPaymentDetails";
import express from 'express';
import { SubmitDonationRequest } from "../../service/donation/model/SubmitDonationRequest";
import { DefaultDonationService } from "../../service/donation/impl/DefaultDonationService";
import { DonationService } from "../../service/donation/DonationService";

class DonationController implements Controller {
    readonly CONTEXT_PATH: string = "/donation"
    donationService: DonationService;
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.post('/submit', this.submit.bind(this));
        this.donationService = new DefaultDonationService();
    }

    public submit(request: Request, response: Response) {
        console.log(request.body);
        if (request.body) {
            let donationPaymentDetails: DonationPaymentDetails = this.getPaymentDetailsFromJSON(request.body);
            let submitDonationRequest: SubmitDonationRequest = this.getDonationRequestFromJSON(request.body, donationPaymentDetails);
            this.donationService.submitDonation(submitDonationRequest);
            response.sendStatus(200);
        } else {
            response.sendStatus(400);
        }
    };

    protected getDonationRequestFromJSON(json: any, donationPaymentDetails: DonationPaymentDetails): SubmitDonationRequest {
        return new SubmitDonationRequest(json.email, json.amount, {id: json.project}, donationPaymentDetails);
    }

    protected getPaymentDetailsFromJSON(json: any): DonationPaymentDetails {
        return new DonationPaymentDetails(json.firstname, json.lastname, json.address, json.address2, 
            json.city, json.state, json.iso3166CountryCode, json.paymentGatewayNonce);
    }
}

export default DonationController;