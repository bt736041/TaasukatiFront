import { createActionGroup, props } from "@ngrx/store";
import { OpenAnswer, OpenQuestion } from "../../models/open-question";

export const OpenActions = createActionGroup({
    source: 'Open',
    events: {
        'Start Open Flow':props<{ testId: number }>(),
        'Start Open Flow Success':props<{question:OpenQuestion}>(),
        'Start Open Flow Failure':props<{message:string}>(),
        'Submit Open Answer':props<{ answer: OpenAnswer }>(),
        'Open Answer Processing':props<{question?:OpenQuestion; error?: string }>()
    }
})
