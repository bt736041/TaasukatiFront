export type Status = 'question' | 'clarification' | 'analysis_done' | 'questions_exhausted' | 'error' | 'incomplete'

export interface OpenQuestion { //OpenQuestionProcessOut
    status: Status,
    question_id?: number,
    question_text?: string,
    clarification_prompt?: string,
}

export interface OpenAnswer { //OpenAnswerIn
    test_id: number,
    question_id: number,
    user_answer: string
}