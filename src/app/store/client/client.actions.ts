import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Category } from "../../models/category";

export const ClientActions = createActionGroup({
    source: 'Client',
    events: {
        'Categories Load': emptyProps(),
        'Categories Load Success': props<{ categories: Array<Category> }>(),
        'Categories Load Failure': props<{ message: string }>(),
    }
})