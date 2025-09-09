import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const ResultsActions = createActionGroup({
    source: 'Results',
    events: {
        'Get Results': emptyProps()
    }
})