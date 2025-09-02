import { Document, model, ObjectId, Schema } from "mongoose";
import "./company-model";

export interface IServerModel extends Document {
    _id: ObjectId;
    name: string;
    ip: string;
    companyHostingId: ObjectId;
    status: "active" | "inactive";
    createdAt: Date;
}

export const ServerSchema = new Schema<IServerModel>({
    name: { type: String, required: true },
    ip:   { type: String, required: true },
    companyHostingId: {
        type: Schema.Types.ObjectId,
        ref: "CompanyModel",
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    timestamps: { createdAt: true, updatedAt: false }
});

export const ServerModel = model<IServerModel>("ServerModel", ServerSchema, "servers");
