import { ONGResponseData } from "../../../data/ongs/ONGResponseData";
import { ONGModel } from "../../../model/ong/ONGModel";
import { ONGService } from "../ONGService";

const request = require('request');

export class DefaultONGService implements ONGService {

    readonly API_KEY: string = "0909f816-07cf-4587-8e51-41745d8edef6";

    readonly GET_ALL_ONGS_SERVICE_ENDPOINT: string = `https://api.globalgiving.org/api/public/orgservice/all/organizations/active?api_key=${this.API_KEY}`;

    readonly GET_NEXT_ONGS_SERVICE_ENDPOINT: string = `https://api.globalgiving.org/api/public/projectservice/all/projects?api_key=${this.API_KEY}&nextProjectId={nextProjectID}`;

    readonly GET_ONG_SERVICE_ENDPOINT: string = `https://api.globalgiving.org/api/public/orgservice/organization/{organizationid}?api_key=${this.API_KEY}`;

    async getAllOngs(): Promise<ONGResponseData> {
        return this.doRequestAllOngs(this.GET_ALL_ONGS_SERVICE_ENDPOINT);
    }

    async getNextOngs(nextProjectID: String): Promise<ONGResponseData>{
        return this.doRequestAllOngs(this.replaceNextProjectIDOnRequestURL(nextProjectID));
    }

    async getOngById(id: String): Promise<ONGResponseData>{
        return this.doRequestONG(this.replaceOrganizationIdOnRequestURL(id));
    }

    private async doRequestAllOngs(URL: String): Promise<ONGResponseData> {
        return new Promise((resolve, reject) => {
            request.get({
                headers: { 'accept': 'application/json' },
                url: URL
            }, function (error: any, response: any, body: any) {
                const bodyResponse: any = JSON.parse(body);
                if (bodyResponse.organizations) {
                    resolve(bodyResponse.organizations);
                } else {
                    resolve(new ONGResponseData());
                }
            });
        }) as Promise<ONGResponseData>;
    }

    private async doRequestONG(URL: String): Promise<ONGResponseData> {
        console.log("URL: " + URL);
        return new Promise((resolve, reject) => {
            request.get({
                headers: { 'accept': 'application/json' },
                url: URL
            }, function (error: any, response: any, body: any) {
                const bodyResponse: any = JSON.parse(body);
                if (bodyResponse) {
                    resolve(bodyResponse);
                } else {
                    resolve(new ONGResponseData());
                }
            });
        }) as Promise<ONGResponseData>;
    }

    private replaceNextProjectIDOnRequestURL(nextProjectID: String): String{
        return this.GET_NEXT_ONGS_SERVICE_ENDPOINT.replace("{nextProjectID}", nextProjectID.toString());
    }

    private replaceOrganizationIdOnRequestURL(id: String): String{
        return this.GET_ONG_SERVICE_ENDPOINT.replace("{organizationid}", id.toString());
    }
}