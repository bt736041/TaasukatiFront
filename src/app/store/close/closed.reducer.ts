import { createReducer, on } from "@ngrx/store";
import { initialOpenState } from "./closed.state";
import { OpenActions } from "./closed.actions";
import { ChatMessage } from "../../models/chat-message";

export const openReducer = createReducer(
    initialOpenState,
    on(OpenActions.startOpenFlow, (state) => ({ ...state, loading: true, error: null })),
    on(OpenActions.startOpenFlowSuccess, (state, { question }) => ({
        ...state,
        loading: false,
        currentQuestion: question.question_id && question.question_text ? { id: question.question_id, text: question.question_text } : null,
        status: question.status === 'question' ? 'waitingAnswer' : question.status === 'clarification' ? 'awaitingClarification' : question.status === 'questions_exhausted' ? 'completed' : state.status,
        error: null,
        chatHistory: question.question_text ? [...state.chatHistory,
        {
            sender: 'system',
            message: question.question_text,
            question_id: question.question_id,
            clarification: false,
            timestamp: Date.now()
        }] : state.chatHistory
    })),
    on(OpenActions.startOpenFlowFailure, (state, { message }) => ({ ...state, loading: false, error: message })),
    on(OpenActions.submitOpenAnswer, (state, { answer }) => ({
        ...state,
        loading: true,
        error: null,
        chatHistory: [...state.chatHistory,
        {
            sender: 'client',
            message: answer.user_answer,
            question_id: state.currentQuestion?.id,
            clarification: false,
            timestamp: Date.now()
        }]
    })),
    on(OpenActions.openAnswerProcessing, (state, { question, error }) => ({
        ...state,
        loading: false,
        currentQuestion:
            question?.status === 'question' &&
                typeof question.question_id === 'number' &&
                typeof question.question_text === 'string' &&
                question.question_text.trim().length
                ? { id: question.question_id, text: question.question_text }
                : state.currentQuestion,
        status: question
            ? (question.status === 'question' && typeof question.question_text === 'string' && question.question_text.trim().length
                ? 'waitingAnswer'
                : question.status === 'clarification' && typeof question.clarification_prompt === 'string' && question.clarification_prompt.trim().length
                    ? 'awaitingClarification'
                    : question.status === 'questions_exhausted'
                        ? 'completed' : state.status)
            : state.status,
        error: error ?? null,
        chatHistory: [
            ...state.chatHistory,
            ...(error && typeof error === 'string' && error.trim().length
                ? ([{ sender: 'system' as const, message: error.trim(), timestamp: Date.now() }] as ChatMessage[])
                : []),
            ...(question?.status === 'question' && typeof question.question_text === 'string' && question.question_text.trim().length
                ? ([{ sender: 'system' as const, message: question.question_text.trim(), ...(typeof question.question_id === 'number' ? { question_id: question.question_id } : {}), clarification: false, timestamp: Date.now() }] as ChatMessage[])
                : []),
            ...(question?.status === 'clarification' && typeof question.clarification_prompt === 'string' && question.clarification_prompt.trim().length
                ? ([{ sender: 'system' as const, message: question.clarification_prompt.trim(), ...(typeof question.question_id === 'number' ? { question_id: question.question_id } : {}), clarification: true, timestamp: Date.now() }] as ChatMessage[])
                : [])
        ]
    }))
);