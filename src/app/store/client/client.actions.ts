import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Category } from "../../models/category";

export const ClientActions = createActionGroup({
    source: 'Client',
    events: {
        'Client Load': props<{ id:string }>,
        'Client Load Success': props<{ categories: Array<Category> }>(),
        'Client Load Failure': props<{ message: string }>(),
    }
})