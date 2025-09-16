import { createReducer, on } from "@ngrx/store";
import { initialState } from "./advisor.state";
import { AdvisorActions } from "./advisor.actions";

export const advisorReducer = createReducer(
    initialState,

    on(AdvisorActions.advisorLoad, (state) => ({
        ...state, loadingAdvisor: true
    })),

    on(AdvisorActions.advisorLoadSuccess, (state, { advisor }) => ({
        ...state, advisor, loadingAdvisor: false
    })),

    on(AdvisorActions.advisorLoadFailure, (state, { message }) => ({
        ...state, loadingAdvisor: false, error: message
    })
    ),

    on(AdvisorActions.clientsLoadSuccess, (state, { clients }) => ({
        ...state,
        clients
    })),

    on(AdvisorActions.createClientSuccess, (state, { client }) => ({
        ...state,
        lastCreatedClient: client
    })),
    on(AdvisorActions.createAdvisorSuccess, (state, { advisor }) => ({
        ...state,
        advisor
    })),
    on(AdvisorActions.createAdvisorFailure, (state, { message }) => ({
        ...state,
        error: message
    })),
);