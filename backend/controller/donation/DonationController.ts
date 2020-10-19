import { Controller } from "../Controller";
import { Request, Response } from 'express';
import { DonationService } from "../../service/donation/DonationService";
import { DonationPaymentDetails } from "../../service/donation/model/DonationPaymentDetails";
import express from 'express';

var donationService: DonationService = require('./../../service/donation/impl/DefaultDonationService');

class DonationController implements Controller {
    readonly CONTEXT_PATH: string = "/donation"
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.post('/submit', this.submit);
    }

    public async submit(request: Request, response: Response) {
        if (request.body) {
            let donationPaymentDetails: DonationPaymentDetails = this.getPaymentDetailsFromJSON(request.body);
            donationService.submitDonation(donationPaymentDetails);
            response.sendStatus(200);
        } else {
            response.sendStatus(400);
        }
    };


    private getPaymentDetailsFromJSON(json: any): DonationPaymentDetails {
        return new DonationPaymentDetails(json.firstname, json.lastname, json.address, json.address2, 
            json.city, json.state, json.iso3166CountryCode, json.paymentGatewayNonce);
    }
}

export default DonationController;