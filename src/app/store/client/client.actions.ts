import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Client } from "../../models/client";

export const ClientActions = createActionGroup({
    source: 'Client',
    events: {
        'Client Load': emptyProps(),
        'Client Load Success': props<{ client: Client }>(),
        'Client Load Failure': props<{ message: string }>(),
        'Get Type Test': props<{advisor_id: number}>(),
        'Get Type Test Success': props<{test_type: string}>(),
        'Get Type Test Failure': props<{message: string}>(),
    }
})