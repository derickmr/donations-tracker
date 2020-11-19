import { DonationsTrackerConstants } from "../../../constants/DonationsTrackerConstants";
import { DefaultTokenGenerationService } from "../../authentication/impl/DefaultTokenGenerationService";
import { TokenGenerationService } from "../../authentication/TokenGenerationService";
import { DonationService } from "../DonationService";
import { DonationForm } from "../model/DonationForm";
import { SubmitDonationRequest } from "../model/SubmitDonationRequest";
import {Connection, ConnectionManager, createConnection, getConnectionManager} from "typeorm";
import { User } from "../../../db/entity/User";
import { Donation } from "../../../db/entity/Donation";
import { DonationSearchParameters } from "../../../model/donation/DonationSearchParameters";
const request = require('request');
const { v4: uuidv4 } = require('uuid');

export class DefaultDonationService implements DonationService {
    tokenGenerationService: TokenGenerationService;

    constructor() {
        this.tokenGenerationService = new DefaultTokenGenerationService();
    }

    search(parameters: DonationSearchParameters): Promise<Donation[]> {
        return new Promise(async (resolve, reject) => {
            let connection;
            try {
                connection = getConnectionManager().get("default");
            } catch (error: any){
                console.log(error);
            }

            if (connection === undefined){
                connection = await createConnection();
            }

            var query = await connection
                .getRepository(Donation)
                .createQueryBuilder("donation")
                .innerJoin("donation.user", "user")
                .where("user.email = :email", {email: parameters.userEmail});

            if (parameters.amountGreaterThan) {
                query.where("donation.amount >= :value", {value: parameters.amountGreaterThan})
            }

            if (parameters.amountLessThan) {
                query.where("donation.amount <= :value", {value: parameters.amountLessThan})
            }

            if (parameters.projectId) {
                query.where("donation.projectId LIKE :value", {value: `%${parameters.projectId}%`})
            }

            if (parameters.donationDateGreaterThan) {
                query.where("donation.date >= :value", {value: parameters.donationDateGreaterThan})
            }

            if (parameters.donationDateLessThan) {
                query.where("donation.date <= :value", {value: parameters.donationDateLessThan})
            }
            const donations: Donation[] = await query.getMany();
            resolve(donations);
        });
    }

    async getAll(email: string): Promise<Donation[]> {
        return new Promise(async (resolve, reject) => {
            let connection;
            try {
                connection = getConnectionManager().get("default");
            } catch (error: any){
                console.log(error);
            }

            if (connection === undefined){
                connection = await createConnection();
            }

            console.log("aaaa");
            console.log("email: " + email);

            const donations: Donation[] = await connection
                .getRepository(Donation)
                .createQueryBuilder("donation")
                .innerJoin("donation.user", "user")
                .where("user.email = :email", {email: email})
                .getMany();
            resolve(donations);
        });
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

    async getMockedUser() {
        let connection;
        try {
            connection = getConnectionManager().get("default");
        } catch (e: any){
            console.log(e);
        }

        if (connection === undefined){
            connection = await createConnection();
        }

        const userRepository = await connection.manager.getRepository(User);

        let user = await userRepository.findOne(
            { where:
                { email: 'aa@mail.com' }
            }
        );

        return user;

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

            let user: User | undefined = await userRepository.findOne(
                { where:
                    { email: form.email }
                }
            );

            if (user) {
                const donation = new Donation();
                donation.projectId = form.projectId;
                donation.amount = form.amount;
                donation.user = user;
                donation.date = new Date();

                console.log("Saving donation...");
                await connection.manager.save(donation);
            }
    }
}