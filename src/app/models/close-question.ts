export type Status = 'question' | 'category_completed' | 'follow_up' | 'analysis_done' | 'error' | 'clarification'

export interface CloseQuestion { //ClosedQuestionProcessOut
    status: Status,
    question_id?: number,
    question_text?: string,
    follow_up_text?: string,
    category_id?: number,
    type_id?: number,
    error_message?: string,
}

export interface CloseAnswer {//ClosedAnswerIn
    test_id: number
    question_id: number
    answer_text: string
}
