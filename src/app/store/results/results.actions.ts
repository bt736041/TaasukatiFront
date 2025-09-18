import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const ResultsActions = createActionGroup({
    source: 'Results',
    events: {
        'Get Types': emptyProps(),
        'Get Types Success': props<{ types: any }>(),
        'Get Types Failure': props<{ message: string }>(),


    }
})