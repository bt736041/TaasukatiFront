
export interface ChatMessage {
    sender: 'system' | 'client'
    message: string
    question_id?: number
    clarification?: boolean;
    timestamp: number;

}