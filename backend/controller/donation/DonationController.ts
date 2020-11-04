import { Controller } from "../Controller";
import { Request, response, Response } from 'express';
import { DonationPaymentDetails } from "../../service/donation/model/DonationPaymentDetails";
import express from 'express';
import { SubmitDonationRequest } from "../../service/donation/model/SubmitDonationRequest";
import { DefaultDonationService } from "../../service/donation/impl/DefaultDonationService";
import { DonationService } from "../../service/donation/DonationService";
import { DonationForm } from "../../service/donation/model/DonationForm";

class DonationController implements Controller {
    readonly CONTEXT_PATH: string = "/donation"
    donationService: DonationService;
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router.post('/submit', this.submit.bind(this));
        this.router.post('/save', this.save.bind(this));
        this.router.get('/user', this.getUser.bind(this));
        this.donationService = new DefaultDonationService();
    }

    public getUser(){
        response.sendStatus(200);
        response.send(this.donationService.getMockedUser());
    }

    public save(request: Request, response: Response) {
        if (request.body) {
            let donationForm: DonationForm = this.getDonationFormFromJSON(request.body);
            this.donationService.saveDonation(donationForm);
            response.sendStatus(200);
        } else {
            response.sendStatus(400);
        }
    };

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

    protected getDonationFormFromJSON(json: any){
        const donationForm = new DonationForm();
        donationForm.firstname = json.firstName;
        donationForm.lastname = json.lastName;
        donationForm.email = json.email;
        donationForm.projectId = json.projectId;
        donationForm.amount = json.amount;

        return donationForm;
    }

    protected getDonationRequestFromJSON(json: any, donationPaymentDetails: DonationPaymentDetails): SubmitDonationRequest {
        return new SubmitDonationRequest(json.email, json.amount, {id: json.project}, donationPaymentDetails);
    }

    protected getPaymentDetailsFromJSON(json: any): DonationPaymentDetails {
        return new DonationPaymentDetails(json.firstname, json.lastname, json.address, json.address2,
            json.city, json.state, json.iso3166CountryCode, json.paymentGatewayNonce);
    }
}

export default DonationController;