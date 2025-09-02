import { configureStore } from "@reduxjs/toolkit";
import type { ServerModel } from "../Models/ServerModel";
import { serverSlice } from "./ServerSlice";

export type AppState = {
  servers: ServerModel[];
};

export const store = configureStore<AppState>({
  reducer: {
    servers: serverSlice.reducer
  }
});

