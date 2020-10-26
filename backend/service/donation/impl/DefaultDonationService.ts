import { DonationsTrackerConstants } from "../../../constants/DonationsTrackerConstants";
import { DefaultTokenGenerationService } from "../../authentication/impl/DefaultTokenGenerationService";
import { TokenGenerationService } from "../../authentication/TokenGenerationService";
import { DonationService } from "../DonationService";
import { SubmitDonationRequest } from "../model/SubmitDonationRequest";
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
}