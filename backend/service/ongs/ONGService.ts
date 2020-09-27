import { ONGModel } from "../../model/ong/ONGModel";

export interface ONGService {
    getAllOngs(): Array<ONGModel>;
    getOngById(id: String): ONGModel;
}