import { createReducer, on } from "@ngrx/store";
import { initialState } from "./client.state";
import { ClientActions } from "./client.actions";

export const clientReducer = createReducer(
    initialState,

    on(ClientActions.clientLoad, (state) => ({
        ...state, loadingClient: true
    })),
    
    on(ClientActions.clientLoadSuccess, (state, { client }) => ({
        ...state, client, loadingClient: false
    })),

    on(ClientActions.clientLoadFailure, (state, { message }) => ({
        ...state, loadingClient: false, error: message
    })
    )
)