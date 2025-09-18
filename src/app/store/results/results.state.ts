import { Type } from "../../models/types";

export interface ResultsState {
    results: any[]; 
    types: Type[]// Replace 'any' with the actual type of a result if available
}

export const initialState: ResultsState = {
    results: [],
    types: []
};