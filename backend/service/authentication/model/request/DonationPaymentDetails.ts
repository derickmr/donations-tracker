export class DonationPaymentDetails {
    firstname: string;
    lastname: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    iso3166CountryCode: string;
    paymentGateway: string;
    paymentGatewayKey: string;
    paymentGatewayNonce: string;

    constructor(firstname: string, lastname: string, address: string, address2: string, city: string,
        state: string, iso3166CountryCode: string, paymentGateway: string, paymentGatewayKey: string, paymentGatewayNonce: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.iso3166CountryCode = iso3166CountryCode;
        this.paymentGateway = paymentGateway;
        this.paymentGatewayKey = paymentGatewayKey;
        this.paymentGatewayNonce = paymentGatewayNonce;
    }
}