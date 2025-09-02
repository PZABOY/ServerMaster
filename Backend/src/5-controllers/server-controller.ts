import express, { Request, Response, Router } from "express";
import { StatusCode } from "../3-models/status-code";
import { serverService } from "../4-services/server-service";

class ServerController {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/servers/Api", this.getAllServers);
        this.router.post("/status/server/api", this.updateServerStatus);
    }

    private async getAllServers(request: Request, response: Response) {
        const servers = await serverService.getAllServers();
        response.json(servers);
    }

    private async updateServerStatus(request: Request, response: Response) {
        const { _id, status } = request.body as { _id: string; status: "active" | "inactive" };
        const dbServer = await serverService.updateServerStatus(_id, status);
        response.status(StatusCode.OK).json(dbServer);
    }
}

export const serverController = new ServerController();
export const router = serverController.router;
