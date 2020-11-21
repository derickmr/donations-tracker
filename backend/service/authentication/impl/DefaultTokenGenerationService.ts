import { TokenGenerationService } from "../TokenGenerationService";

import { TokenGenerationRequestUser } from './../model/TokenGenerationRequestUser';
import { TokenGenerationRequest } from './../model/TokenGenerationRequest';
import { DonationsTrackerConstants } from "../../../constants/DonationsTrackerConstants";

const request = require('request');

export class DefaultTokenGenerationService implements TokenGenerationService {
    async generate(): Promise<string> {
        return this.doRequest();
    }

    private async doRequest(): Promise<string> {
        return new Promise((resolve, reject) => {
            const authenticationUser: TokenGenerationRequestUser =
                new TokenGenerationRequestUser(DonationsTrackerConstants.GLOBAL_GIVING_USER, 
                    DonationsTrackerConstants.GLOBAL_GIVING_PASSWORD);
            const authenticationRequest: TokenGenerationRequest =
                new TokenGenerationRequest(authenticationUser, DonationsTrackerConstants.API_KEY);

            const bodyData: string = JSON.stringify({ "auth_request": authenticationRequest });

            request.post({
                headers: { 'accept': 'application/json' },
                url: DonationsTrackerConstants.TOKEN_SERVICE_ENDPOINT,
                body: bodyData
            }, function (error: any, response: any, body: any) {
                const bodyResponse: any = JSON.parse(body);
                if (bodyResponse.auth_response && bodyResponse.auth_response.access_token) {
                    resolve(bodyResponse.auth_response.access_token);
                } else {
                    resolve("");
                }
            });
        }) as Promise<string>;
    }
}