import { createAction, createActionGroup, props } from "@ngrx/store";
import { CloseAnswer, CloseQuestion } from "../../models/close-question";
import { OpenQuestion } from "../../models/open-question";


export const CloseActions = createActionGroup({
    source: 'Close',
    events: {
        'Set Closed Test': props<{ testId: number }>(),
        'Start Closed Category': props<{ categoryId: number }>(),
        'Start Closed Category Success': props<{
            categoryId: number;
            status: 'question' | 'clarification' | 'follow_up' | 'category_completed' | 'analysis_done';
            questionId?: number;
            questionText?: string;
            clarification?: string;
            followUp?: string;
        }>(),
        'Start Closed Category Failure': props<{ error: string }>(),
        'Submit Closed Answer': props<{ answer: string }>(),
        'Closed Answer Processed': props<{
              status: 'question' | 'clarification' | 'follow_up' | 'category_completed' |
        'analysis_done' | 'error';
        categoryId?: number;
        questionId?: number;
        questionText?: string;
        clarification?: string;
        followUp?: string;
        error?: string;
    }>()
    }
})

