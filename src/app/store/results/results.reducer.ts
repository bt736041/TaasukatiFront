// Update the import path to the correct location of initialState
import { createReducer, on } from "@ngrx/store";
import { initialState } from "../results/results.state";
import { ResultsActions } from "./results.actions";

export const resultReducer = createReducer(
    initialState,
    
    on(ResultsActions.getTypesSuccess, (state, { types }) => ({
        ...state,
        types,  
    })),
    on(ResultsActions.getTypesFailure, (state, { message }) => ({
        ...state,   
        error: message
    })
    ),
    

)