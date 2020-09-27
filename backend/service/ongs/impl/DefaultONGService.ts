import { ONGModel } from "../../../model/ong/ONGModel";
import { ONGService } from "../ONGService";

export class DefaultTokenGenerationService implements ONGService {
    getAllOngs(): Array<ONGModel> {
        let ongs = new Array<ONGModel>();
        return ongs;
    }

    getOngById(id: String): ONGModel{
        let ong = new ONGModel();
        return ong;
    }
}