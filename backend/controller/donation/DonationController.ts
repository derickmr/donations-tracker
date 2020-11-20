import { Controller } from "../Controller";
import { Request, response, Response } from 'express';
import { DonationPaymentDetails } from "../../service/donation/model/DonationPaymentDetails";
import express from 'express';
import { SubmitDonationRequest } from "../../service/donation/model/SubmitDonationRequest";
import { DefaultDonationService } from "../../service/donation/impl/DefaultDonationService";
import { DonationService } from "../../service/donation/DonationService";
import { DonationForm } from "../../service/donation/model/DonationForm";
import { Donation } from "../../db/entity/Donation";
import { AbstractController } from "../AbstractController";
import { DonationSearchParameters } from "../../model/donation/DonationSearchParameters";

class DonationController extends AbstractController implements Controller {
    readonly CONTEXT_PATH: string = "/donation"
    donationService: DonationService;
    router: express.Router;

    constructor() {
        super();
        this.router = express.Router();
        this.router.post('/submit', this.submit.bind(this));
        this.router.post('/save', super.verifyJWT, this.save.bind(this));
        this.router.get('/all/:email', super.verifyJWT, this.getAll.bind(this));
        this.router.get('/search', super.verifyJWT, this.search.bind(this));
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
        if (request.body) {
            let donationPaymentDetails: DonationPaymentDetails = this.getPaymentDetailsFromJSON(request.body);
            let submitDonationRequest: SubmitDonationRequest = this.getDonationRequestFromJSON(request.body, donationPaymentDetails);
            response.sendStatus(200);
        } else {
            response.sendStatus(400);
        }
    };

    public async search(request: Request, response: Response) {
        if(request.body) {
            try {
                var donations: Donation[] = await this.donationService.search(this.getDonationSearchParameters(request.body));
                response.send(donations);
            } catch (error) {
                response.status(400).send("Failed to retrieve search donations, cause: " + error)
            }
        }
    }

    public async getAll(request: Request, response: Response) {
        if (request.params) {
            try {
                var donations: Donation[] = await this.donationService.getAll(request.params.email);
                response.send(donations);
            } catch (error) {
                response.status(400).send("Failed to retrieve all donations, cause: " + error)
            }
        }
    }

    protected getDonationSearchParameters(json: any): DonationSearchParameters {
        const searchParameters: DonationSearchParameters = new DonationSearchParameters();
        searchParameters.amountGreaterThan = json.amountGreaterThan;
        searchParameters.amountLessThan = json.amountLessThan;
        searchParameters.donationDateGreaterThan = json.donationDateGreaterThan;
        searchParameters.donationDateLessThan = json.donationDateLessThan;
        searchParameters.projectId = json.projectId;
        searchParameters.userEmail = json.userEmail;
        return searchParameters;
    }

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