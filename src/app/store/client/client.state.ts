import { Client } from "../../models/client";

export interface clientState {
    client: Client | null;
    loadingClient: boolean;
    error: string | null;
}

export const initialState: clientState = {
    client: {} as Client,
    loadingClient: false,
    error: null
}