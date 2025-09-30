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
     on(ResultsActions.loadProfile, (state, { testId }) => ({
    ...state,
    loading: { ...state.loading, [testId]: true },
    error: { ...state.error, [testId]: undefined },
  })),
  on(ResultsActions.loadProfileSuccess, (state, { testId, data }) => ({
    ...state,
    entities: { ...state.entities, [testId]: data },
    loading: { ...state.loading, [testId]: false },
    error: { ...state.error, [testId]: undefined },
  })),
  on(ResultsActions.loadProfileFailure, (state, { testId, error }) => ({
    ...state,
    loading: { ...state.loading, [testId]: false },
    error: { ...state.error, [testId]: error },
  }))

)

