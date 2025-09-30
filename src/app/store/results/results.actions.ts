import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AiProfileResponse } from "../../models/ai-profile";

export const ResultsActions = createActionGroup({
    source: 'Results',
    events: {
        'Get Types': emptyProps(),
        'Get Types Success': props<{ types: any }>(),
        'Get Types Failure': props<{ message: string }>(),
        'Load Profile': props<{ testId: number }>(),
        'Load Profile Success': props<{ testId: number; data: AiProfileResponse }>(),
        'Load Profile Failure': props<{ testId: number; error: string }>()


    }
})




