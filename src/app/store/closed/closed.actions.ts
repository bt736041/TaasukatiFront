import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Category } from "../../models/category";
import { CloseQuestion } from "../../models/close-question";
import { OpenQuestion } from "../../models/open-question";

export const ClosedActions = createActionGroup({
    source: 'Closed',
    events:{
        'Load Categories':emptyProps(),
        'Load Categories Success':props<{categories:Category[]}>(),
        'Load Categories Failure':props<{message:string}>(),
        'Start Closed Flow': emptyProps(),
        'Start Closed Flow Success': props<{question:CloseQuestion}>(),
        'Start Closed Flow Failure': props<{message:string}>(),
        'Submit Closed Answer':props<{ userAnswer: string }>(),
        'Closed Answer Processing':props<{
            source: 'closed' | 'open'; 
            categoryId?: number;  
            closedQuestion?: CloseQuestion;
            openQuestion?: OpenQuestion;
            error?: string;
        }>()
    }
})

