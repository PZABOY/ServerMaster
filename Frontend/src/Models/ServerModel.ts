export class ServerModel {
    public _id?: string;
    public name?: string;
    public ip?: string;
    public companyHostingId?: string;
    public status?: "active" | "inactive";
    public createdAt?: Date;    
}
