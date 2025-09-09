import { Category } from "../../models/category";
import { Client } from "../../models/client";

export interface clientState {
    client: Client | null;
    categories: Array<Category>
    loadingClient: boolean;
    loadingCategories: boolean;
    error: string | null;
}

export const initialState: clientState = {
    client: {} as Client,
    categories: [],
    loadingClient: false,
    loadingCategories: false,
    error: null
}