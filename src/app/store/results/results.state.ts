import { AiProfileResponse } from "../../models/ai-profile";



export interface AiResultsState {
  entities: Record<number, AiProfileResponse | undefined>;
  loading: Record<number, boolean | undefined>;
  error: Record<number, string | undefined>;
  incomplete: Record<number, string | undefined>; // ← חדש
  types: Array<{ id: number; name: string }>; 
}

export const initialState: AiResultsState = {
  entities: {},
  loading: {},
  error: {},
  incomplete: {},
  types: []
};
