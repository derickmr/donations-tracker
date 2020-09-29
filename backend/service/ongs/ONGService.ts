import { ONGResponseData } from "../../data/ongs/ONGResponseData";
import { ONGModel } from "../../model/ong/ONGModel";

export interface ONGService {
    getAllOngs(): Promise<ONGResponseData>;
    getOngById(id: String): Promise<ONGResponseData>;
    getNextOngs(nextProjectID: String): Promise<ONGResponseData>;
}