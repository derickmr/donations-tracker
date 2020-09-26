import { TokenGenerationService } from "../TokenGenerationService";

import { TokenGenerationRequestUser } from './../model/TokenGenerationRequestUser';
import { TokenGenerationRequest } from './../model/TokenGenerationRequest';

const request = require('request');

export class DefaultTokenGenerationService implements TokenGenerationService {
    readonly TOKEN_SERVICE_ENDPOINT: string = "https://api.globalgiving.org/api/userservice/tokens";
    readonly TOKEN_GENERATION_USER: string = "testguipohl@gmail.com";
    readonly TOKEN_GENERATION_PASSWORD: string = "Donationstrackerpass";
    readonly TOKEN_GENERATION_API_KEY: string = "0909f816-07cf-4587-8e51-41745d8edef6";


    async generate(): Promise<string> {
        return this.doRequest();
    }

    private async doRequest(): Promise<string> {
        return new Promise((resolve, reject) => {
            const authenticationUser: TokenGenerationRequestUser =
                new TokenGenerationRequestUser(this.TOKEN_GENERATION_USER, this.TOKEN_GENERATION_PASSWORD);
            const authenticationRequest: TokenGenerationRequest =
                new TokenGenerationRequest(authenticationUser, this.TOKEN_GENERATION_API_KEY);

            const bodyData: string = JSON.stringify({ "auth_request": authenticationRequest });

            request.post({
                headers: { 'accept': 'application/json' },
                url: this.TOKEN_SERVICE_ENDPOINT,
                body: bodyData
            }, function (error: any, response: any, body: any) {
                const bodyResponse: any = JSON.parse(body);
                if (bodyResponse.auth_response && bodyResponse.auth_response.access_token) {
                    resolve(bodyResponse.auth_response.access_token);
                } else {
                    resolve("");
                }
            });
        });
    }
}