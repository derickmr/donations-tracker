import { DonationsTrackerConstants } from "../../../constants/DonationsTrackerConstants";
import { DefaultTokenGenerationService } from "../../authentication/impl/DefaultTokenGenerationService";
import { TokenGenerationService } from "../../authentication/TokenGenerationService";
import { DonationService } from "../DonationService";
import { DonationForm } from "../model/DonationForm";
import { SubmitDonationRequest } from "../model/SubmitDonationRequest";
import {Connection, ConnectionManager, createConnection, getConnectionManager} from "typeorm";
import { User } from "../../../db/entity/User";
import { Donation } from "../../../db/entity/Donation";
const request = require('request');
const { v4: uuidv4 } = require('uuid');

export class DefaultDonationService implements DonationService {
    tokenGenerationService: TokenGenerationService;

    constructor() {
        this.tokenGenerationService = new DefaultTokenGenerationService();
    }

    async submitDonation(submitDonationRequest: SubmitDonationRequest) {
        let authenticationToken: string = await this.tokenGenerationService.generate();
        submitDonationRequest.refcode = uuidv4();
        submitDonationRequest.payment_detail.paymentGateway = DonationsTrackerConstants.PAYMENT_GATEWAY;
        submitDonationRequest.payment_detail.paymentGatewayKey = DonationsTrackerConstants.PAYMENT_GATEWAY_KEY;

        const bodyData: string = JSON.stringify({ "donation": submitDonationRequest });

        await request.post({
            headers: { 'accept': 'application/json' },
            url: DonationsTrackerConstants.DONATION_SERVICE_ENDPOINT + "api_key="
            + DonationsTrackerConstants.API_KEY + "&api_token=" + authenticationToken,
            body: bodyData
        }, function (error: any, response: any, body: any) {
            const bodyResponse: any = JSON.parse(body);
            console.log(bodyResponse)
        });
    }

    async saveDonation(form: DonationForm) {
        let connection;
        try {
            connection = getConnectionManager().get("default");
        } catch (e: any){
            console.log(e);
        }

        if (connection !== undefined){
            this.save(connection, form);
        } else {
            connection = await createConnection();
            this.save(connection, form);
        }

    }

    async save(connection: Connection, form: DonationForm){

            const userRepository = await connection.manager.getRepository(User);

            let user = await userRepository.findOne(
                { where:
                    { email: form.email }
                }
            );

            if (user === undefined){
                user = new User();
                user.email = form.email;
                user.firstName = form.firstname;
                user.lastName = form.lastname;
            }

            const donation = new Donation();
            donation.projectId = form.projectId;
            donation.amount = form.amount;

            if (user.donations === undefined || user.donations === null){
                user.donations = new Array<Donation>();
            }

            user?.donations.push(donation);

            console.log("Saving user and donation...");

            console.log("User: " + JSON.stringify(user));
            console.log("Donation: " + JSON.stringify(donation));

            await connection.manager.save(donation);
            await connection.manager.save(user);

    }

}