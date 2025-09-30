import { AiProfileResponse } from "../../models/ai-profile";



export interface AiResultsState {
  entities: Record<number, AiProfileResponse | undefined>;
  loading: Record<number, boolean | undefined>;
  error: Record<number, string | undefined>;
}

export const initialState: AiResultsState = {
  entities: {},
  loading: {},
  error: {},
};
