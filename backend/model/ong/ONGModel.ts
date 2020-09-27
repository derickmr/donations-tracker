import { CountryModel } from "../country/CountryModel";
import { ThemeModel } from "../theme/ThemeModel";

export class ONGModel {
    activeProjects: Number;
    addressLine1: String;
    addressLine2: String;
    city: String;
    countries: Array<CountryModel>;
    country: CountryModel;
    id: String;
    isoCountryCode: String;
    logoUrl: String;
    mission: String;
    name: String;
    postal: String;
    state: String;
    themes: Array<ThemeModel>;
    totalProjects: Number;
    url: String;
}