import { ChatMessage } from "../../models/chat-message";

export interface OpenState {
    testId: number | null
    currentQuestion: { id: number; text: string } | null
    chatHistory: ChatMessage[];
    status: 'idle' | 'waitingAnswer' | 'awaitingClarification' | 'processingAnswer' | 'completed';
    loading: boolean;
    error: string | null
}

export const initialOpenState: OpenState = {
    testId: null,
    currentQuestion: null,
    chatHistory: [],
    status: 'idle',
    loading: false,
    error: null
}