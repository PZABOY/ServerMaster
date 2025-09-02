import axios, { type AxiosRequestConfig } from "axios";
import { ServerModel } from "../Models/ServerModel";
import { serverSlice } from "../Redux/ServerSlice";
import { store } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";

class ServerService {

    public async getAllServers(): Promise<ServerModel[]> {
        if (store.getState().servers.length > 0) return store.getState().servers;
        const response = await axios.get<ServerModel[]>(appConfig.serversUrl); 

        const servers = response.data;

        store.dispatch(serverSlice.actions.initServers(servers));

        return servers;
    }

    public async updateServerStatus(_id: string, status: "active" | "inactive"): Promise<void> {

        const body = { _id, status };

        const options: AxiosRequestConfig = {
            headers: { "Content-Type": "application/json" }
        };

        const response = await axios.post<ServerModel>(appConfig.serverStatusUrl, body, options); // e.g. "/status/server/api"

        const dbServer = response.data;

        store.dispatch(serverSlice.actions.updateServer(dbServer));
    }
}

export const serverService = new ServerService();
