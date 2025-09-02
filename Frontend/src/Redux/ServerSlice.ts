import { ServerModel } from "../Models/ServerModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

function initServers(_currentState: ServerModel[], action: PayloadAction<ServerModel[]>): ServerModel[] {

    const initialServers: ServerModel[] = action.payload;

    const newState: ServerModel[] = initialServers;

    return newState;
};

function updateServer(currentState: ServerModel[], action: PayloadAction<ServerModel>): ServerModel[] {

    const newState: ServerModel[] = [...currentState];

    const serverToUpdate: ServerModel = action.payload;

    const indexToUpdate = newState.findIndex(s => s._id === serverToUpdate._id);
    newState[indexToUpdate] = serverToUpdate;

    return newState;
};


export const serverSlice = createSlice({
    name: "serverSlice",
    initialState: [] as ServerModel[], 
    reducers: { initServers, updateServer}
});
