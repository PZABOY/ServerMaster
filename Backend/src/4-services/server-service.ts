import { ObjectId } from "mongoose";
import { ResourceNotFound, ValidationError } from "../3-models/client-errors";
import { IServerModel, ServerModel } from "../3-models/server-model";

type ServerStatus = "active" | "inactive";

class ServerService {

    public getAllServers(): Promise<IServerModel[]> {
        return ServerModel.find().populate("companyHostingId", "name").exec();
    }

    public async updateServerStatus(_id: string | ObjectId, status: ServerStatus): Promise<IServerModel> {

        if (!["active", "inactive"].includes(status)) {
            throw new ValidationError("Invalid status. Must be 'active' or 'inactive'.");
        }

        const dbServer = await ServerModel.findByIdAndUpdate(
            _id,
            { $set: { status } },
            { returnOriginal: false } 
        )
        .populate("companyHostingId", "name")
        .exec();

        if (!dbServer) throw new ResourceNotFound(_id);

        return dbServer;
    }
}

export const serverService = new ServerService();
