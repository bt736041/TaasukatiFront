import { createReducer, on } from "@ngrx/store";
import { initialClosedState } from "./closed.state";
import { ClosedActions } from "./closed.actions";
import { ChatMessage } from "../../models/chat-message";

export const closedReducer = createReducer(
    initialClosedState,
    on(ClosedActions.loadCategoriesSuccess, (state, { categories }) => (
        {
            ...state,
            categories: categories
        })),
    on(ClosedActions.loadCategoriesFailure, (state, { message }) => (
        {
            ...state,
            error: message
        })),
    on(ClosedActions.startClosedFlow, (state => (
        {
            ...state,
            loading: true,
            error: null
        }))),
    on(ClosedActions.startClosedFlowSuccess, (state, { question }) => {
        const categoryId = question.category_id ?? state.currentCategoryId;
        if (categoryId == null) return state;

        let cat = state.byCategory[categoryId] ?? {
            currentQuestion: null,
            chatHistory: [],
            status: 'idle'
        };
        cat = {
            currentQuestion: {
                id: question.question_id!,
                text: question.question_text ?? '',
                isOpen: false
            },
            chatHistory: [...cat.chatHistory, {
                sender: 'system' as const,
                message: question.question_text,
                question_id: question.question_id,
                timestamp: Date.now()
            } as ChatMessage],
            status: 'waitingAnswer'
        }

        return {
            ...state,
            currentCategoryId: categoryId,
            byCategory: {
                ...state.byCategory,
                [categoryId]: cat
            },
            loading: false,
            error: null
        }
    }),
    on(ClosedActions.startClosedFlowFailure, (state, { message }) => (
        {
            ...state,
            loading: false,
            error: message
        })),
    on(ClosedActions.submitClosedAnswer, (state, { userAnswer }) => {
        const categoryId = state.currentCategoryId;
        if (categoryId == null) return state;
        let cat = state.byCategory[categoryId] ?? { currentQuestion: null, chatHistory: [], status: 'idle' };
        cat = {
            ...cat,
            chatHistory: [...cat.chatHistory, {
                sender: 'client' as const,
                message: userAnswer,
                question_id: cat.currentQuestion?.id,
                timestamp: Date.now()
            } as ChatMessage],
            status: 'processingAnswer'
        }
        return {
            ...state,
            loading: true,
            byCategory: {
                ...state.byCategory,
                [categoryId]: cat
            }
        }
    }),
    on(ClosedActions.closedAnswerProcessing, (state, action) => {
        const { source, categoryId, closedQuestion, openQuestion, error } = action;
        if (error) {
            return {
                ...state,
                error: error,
                loading: false
            }
        }
        if (categoryId == null) return state;
        let cat = state.byCategory[categoryId] ?? { currentQuestion: null, chatHistory: [], status: 'idle' };
        let currentQuestion = cat.currentQuestion
        let chatHistory = cat.chatHistory
        let status = cat.status

        if (source === 'closed' && closedQuestion) {
            switch (closedQuestion.status) {
                case 'question':
                    currentQuestion =
                    {
                        id: closedQuestion.question_id!,
                        text: closedQuestion.question_text!,
                        isOpen: false
                    }
                    chatHistory = [...chatHistory, {
                        sender: 'system' as const,
                        message: closedQuestion.question_text,
                        question_id: closedQuestion.question_id,
                        timestamp: Date.now()
                    } as ChatMessage]
                    status = 'waitingAnswer'
                    break
                case 'clarification':
                    currentQuestion =
                    {
                        id: closedQuestion.question_id!,
                        text: closedQuestion.question_text!,
                        isOpen: false
                    }
                    chatHistory = [...chatHistory, {
                        sender: 'system' as const,
                        message: closedQuestion.question_text,
                        question_id: closedQuestion.question_id,
                        clarification: true,
                        timestamp: Date.now()
                    } as ChatMessage]
                    status = 'awaitingClarification'
                    break
                case 'follow_up':
                    currentQuestion =
                    {
                        id: closedQuestion.question_id!,
                        text: closedQuestion.question_text!,
                        isOpen: true
                    }
                    chatHistory = [...chatHistory, {
                        sender: 'system' as const,
                        message: closedQuestion.question_text,
                        question_id: closedQuestion.question_id,
                        follow_up: true,
                        timestamp: Date.now()
                    } as ChatMessage]
                    status = 'waitingAnswer'
                    break
                case 'category_completed':
                    status = 'categoryCompleted'
                    break
            }
        }
        if (source === 'open' && openQuestion) {
            switch (openQuestion.status) {
                case 'question':
                    currentQuestion =
                    {
                        id: openQuestion.question_id!,
                        text: openQuestion.question_text!,
                        isOpen: true
                    }
                    chatHistory = [...chatHistory, {
                        sender: 'system' as const,
                        message: openQuestion.question_text,
                        question_id: openQuestion.question_id,
                        timestamp: Date.now()
                    } as ChatMessage]
                    status = 'waitingAnswer'
                    break
                case 'clarification':
                    currentQuestion =
                    {
                        id: openQuestion.question_id!,
                        text: openQuestion.clarification_prompt!,
                        isOpen: true
                    }
                    chatHistory = [...chatHistory, {
                        sender: 'system' as const,
                        message: openQuestion.clarification_prompt,
                        question_id: openQuestion.question_id,
                        clarification: true,
                        timestamp: Date.now()
                    } as ChatMessage]
                    status = 'waitingAnswer'
                    break
            }
        }
        cat = {
            ...cat,
            currentQuestion: currentQuestion,
            chatHistory: chatHistory,
            status: status
        }
        return {
            ...state,
            loading: false,
            error: null,
            byCategory: {
                ...state.byCategory,
                [categoryId]: cat
            }
        }
    })
)