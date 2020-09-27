import { ONGModel } from "../../model/ong/ONGModel";

export class ONGResponseData {
    hasNext: Boolean;
    nextOrgId: Number;
    organizations: Array<ONGModel>;
}