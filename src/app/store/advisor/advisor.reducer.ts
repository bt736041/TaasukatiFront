import { createReducer, on } from "@ngrx/store";
import { initialState } from "./advisor.state";
import { AdvisorActions } from "./advisor.actions";

export const advisorReducer = createReducer(
    initialState,

    on(AdvisorActions.advisorLoad, (state) => ({
        ...state, loading: true
    })),

    on(AdvisorActions.advisorLoadSuccess, (state, { advisor }) => ({
        ...state, advisor, loading: false
    })),

    on(AdvisorActions.advisorLoadFailure, (state, { message }) => ({
        ...state, loading: false, error: message
    })
    ),
    on(AdvisorActions.clientsLoad, (state) => ({
        ...state, loading: true
    })),

    on(AdvisorActions.clientsLoadSuccess, (state, { clients }) => ({
        ...state,
        loading: false,
        clients
    })),
    on(AdvisorActions.clientsLoadFailure, (state, { message }) => ({
        ...state,
        loading: false,
        error: message
    })),
    on(AdvisorActions.regionsLoadSuccess, (state, { regions }) => ({
        ...state,
        regions
    })),
    on(AdvisorActions.regionsLoadFailure, (state, { message }) => ({
        ...state,
        error: message
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
    on(AdvisorActions.createClient , (state) => ({
        ...state,
        loading: true
    })),
    on(AdvisorActions.createClientSuccess, (state, { client }) => ({
        ...state,
        loading: false,
        lastCreatedClient: client
    })),
    on(AdvisorActions.createClientFailure, (state, { message }) => ({
        ...state,
        loading: false,
        error: message
    })),
    on(AdvisorActions.updateClient, (state) => ({
        ...state,
        loading: true
    })),
    
    on(AdvisorActions.updateClientFailure, (state, { message }) => ({
        ...state,   
        loading: false,
        error: message
    })),
    on(AdvisorActions.deleteClientFailure, (state, { message }) => ({
        ...state,
        error: message
    })),
);