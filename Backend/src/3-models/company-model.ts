import { Document, model, ObjectId, Schema } from "mongoose";

export interface ICompanyModel extends Document {
    _id: ObjectId;
    name: string;
}

export const CompanySchema = new Schema<ICompanyModel>({
    name: {
        type: String,
        required: [true, "Missing company name."],
        minlength: [2, "Company name too short."],
        maxlength: [100, "Company name too long."]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

export const CompanyModel = model<ICompanyModel>("CompanyModel", CompanySchema, "companies");
