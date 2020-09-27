import { ONGResponseData } from "../../../data/ongs/ONGResponseData";
import { ONGModel } from "../../../model/ong/ONGModel";
import { ONGService } from "../ONGService";

const request = require('request');

export class DefaultONGService implements ONGService {

    readonly API_KEY: string = "0909f816-07cf-4587-8e51-41745d8edef6";

    readonly GET_ALL_ONGS_SERVICE_ENDPOINT: string = `https://api.globalgiving.org/api/public/orgservice/all/organizations/active?api_key=${this.API_KEY}`;

    readonly GET_ONG_SERVICE_ENDPOINT: string = `https://api.globalgiving.org/api/public/orgservice/organization/{organizationid}?api_key=${this.API_KEY}`;

    async getAllOngs(): Promise<ONGResponseData> {
        return this.doRequestAllOngs();
    }

    private async doRequestAllOngs(): Promise<ONGResponseData> {
        return new Promise((resolve, reject) => {

            request.get({
                headers: { 'accept': 'application/json' },
                url: this.GET_ALL_ONGS_SERVICE_ENDPOINT
            }, function (error: any, response: any, body: any) {
                const bodyResponse: any = JSON.parse(body);
                if (bodyResponse.organizations) {
                    resolve(bodyResponse.organizations);
                } else {
                    resolve(new ONGResponseData());
                }
            });
        });
    }

    private async doRequestONG(URL: String): Promise<ONGModel> {
        return new Promise((resolve, reject) => {

            request.get({
                headers: { 'accept': 'application/json' },
                url: URL
            }, function (error: any, response: any, body: any) {
                const bodyResponse: any = JSON.parse(body);
                if (bodyResponse) {
                    resolve(bodyResponse);
                } else {
                    resolve(new ONGModel());
                }
            });
        });
    }

    async getOngById(id: String): Promise<ONGModel>{
        return await this.doRequestONG(this.replaceOrganizationIdOnRequestURL(id));
    }

    private replaceOrganizationIdOnRequestURL(id: String): String{
        return this.GET_ONG_SERVICE_ENDPOINT.replace("{organizationid}", id.toString());
    }
}