import { createReducer ,on} from "@ngrx/store";
import { initialState } from "./advisor.state";
import { AdvisorActions } from "./advisor.actions";

export const advisorReducer = createReducer(
    initialState,

    on(AdvisorActions.clientsLoadSuccess,(state,{clients})=>({
        ...state,
        clients
    })),

    on(AdvisorActions.createClientSuccess,(state,{client})=>({
        ...state,
        lastCreatedClient: client
    }))
)