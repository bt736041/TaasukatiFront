import { Category } from "../../models/category";
import { ChatMessage } from "../../models/chat-message";

export interface ClosedCategoryState {
  currentQuestion: { id: number; text: string; isOpen: boolean} | null;
  chatHistory: ChatMessage[];
  status: 'idle' | 'waitingAnswer' | 'awaitingClarification' | 'processingAnswer' | 'categoryCompleted' | 'completed';
}

export interface ClosedState {
  testId: number | null;
  categories:Category[];
  currentCategoryId: number | null;
  byCategory: Record<number, ClosedCategoryState>;
  loading: boolean;
  error: string | null;
}

export const initialClosedState: ClosedState = {
  testId: null,
  categories:[],
  currentCategoryId: null,
  byCategory: {},
  loading: false,
  error: null,
};