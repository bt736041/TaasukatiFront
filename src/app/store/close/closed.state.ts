import { Inject } from "@angular/core";
import { Category } from "../../models/category";
import { ChatMessage } from "../../models/chat-message";
import { CategoryService } from "../../services/category.service";



// export interface CloseState {
//     testId: number | null
//     currentQuestion: { id: number; text: string } | null
//     status: 'idle' | 'waitingAnswer' | 'awaitingClarification' | 'completed';
//     loading: boolean;
//     error: string | null
//     catrgories :Category[] | null
//     curentCategoryId:number | null
// }

// export const initialCloseState: CloseState = {
//     testId: null,
//     currentQuestion: null,
//     status: 'idle',
//     loading: false,
//     error: null,
//     catrgories:  null,
//     curentCategoryId:null
// }

export interface ClosedChatMessage {
sender: 'system' |'client';
message: string;
questionId?: number;
clarification?: boolean;
timestamp: number;
}

export interface ClosedCategoryState {
currentQuestion: { id: number; text: string } | null;
chatHistory: ClosedChatMessage[];
status: 'idle' | 'waitingAnswer' | 'awaitingClarification' | 'categoryCompleted' |
'completed';
}

export interface ClosedState {
testId: number | null;
currentCategoryId: number | null;
byCategory: Record<number, ClosedCategoryState>;
loading: boolean;
error: string | null;
}

export const initialClosedState: ClosedState = {
testId: null,
currentCategoryId: null,
byCategory: {},
loading: false,
error: null,
};