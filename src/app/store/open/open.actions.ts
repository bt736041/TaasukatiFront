import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { OpenAnswer, OpenQuestion } from "../../models/open-question";

export const OpenActions = createActionGroup({
    source: 'Open',
    events: {
        'Start Open Flow':emptyProps(),
        'Start Open Flow Success':props<{question:OpenQuestion}>(),
        'Start Open Flow Failure':props<{message:string}>(),
        'Submit Open Answer':props<{ userAnswer: string }>(),
        'Open Answer Processing':props<{question?:OpenQuestion; error?: string }>()
    }
})
