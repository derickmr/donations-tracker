import { DefaultTokenGenerationService } from "../../authentication/impl/DefaultTokenGenerationService";
import { TokenGenerationService } from "../../authentication/TokenGenerationService";
import { DonationService } from "../DonationService";
import { SubmitDonationRequest } from "../model/SubmitDonationRequest";
const request = require('request');
const { v4: uuidv4 } = require('uuid');

export class DefaultDonationService implements DonationService {
    readonly DONATION_SERVICE_ENDPOINT: string = "https://api.globalgiving.org/api/secure/givingservice/donationsclient?is_test=true";
    readonly API_KEY: string = "0909f816-07cf-4587-8e51-41745d8edef6";
    readonly PAYMENT_GATEWAY: string = "braintree";
    readonly PAYMENT_GATEWAY_KEY: string = "12345";
    
    tokenGenerationService: TokenGenerationService;

    constructor() {
        this.tokenGenerationService = new DefaultTokenGenerationService();
    }

    async submitDonation(submitDonationRequest: SubmitDonationRequest) {
        let authenticationToken: string = await this.tokenGenerationService.generate();
        submitDonationRequest.refcode = uuidv4();
        submitDonationRequest.payment_detail.paymentGateway = this.PAYMENT_GATEWAY;
        submitDonationRequest.payment_detail.paymentGatewayKey = this.PAYMENT_GATEWAY_KEY;

        const bodyData: string = JSON.stringify({ "donation": submitDonationRequest });

        await request.post({
            headers: { 'accept': 'application/json' },
            url: this.DONATION_SERVICE_ENDPOINT + "api_key=" + this.API_KEY + "&api_token=" + authenticationToken,
            body: bodyData
        }, function (error: any, response: any, body: any) {
            const bodyResponse: any = JSON.parse(body);
            console.log(bodyResponse)
        });
    }
}