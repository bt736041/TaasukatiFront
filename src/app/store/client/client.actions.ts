import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Client } from "../../models/client";

export const ClientActions = createActionGroup({
    source: 'Client',
    events: {
        'Client Load': emptyProps(),
        'Client Load Success': props<{ client: Client }>(),
        'Client Load Failure': props<{ message: string }>(),
    }
})