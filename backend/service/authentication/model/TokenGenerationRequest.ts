import { TokenGenerationRequestUser } from "./TokenGenerationRequestUser"

export class TokenGenerationRequest {
    user: TokenGenerationRequestUser;
    api_key: string;

    constructor(user: TokenGenerationRequestUser, api_key: string) {
        this.user = user;
        this.api_key = api_key;
    }
}