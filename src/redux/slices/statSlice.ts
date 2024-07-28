import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Stat {
  id: number;
  playerId: number;
  nickname: string;
  profileImage: string;
  createdAt: string;
  score: number;
}

interface StatState {
  topScores: Stat[];
  totalCount: number;
  lastUpdate: string | null;
  isLoading: boolean;
}

const initialState: StatState = {
  topScores: [],
  totalCount: 0,
  lastUpdate: null,
  isLoading: false,
};

const statSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setTopScores(state, action: PayloadAction<Stat[]>) {
      state.topScores = action.payload;
    },
    setLastUpdate(state, action: PayloadAction<string>) {
      state.lastUpdate = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    fetchTopScoresAction() {},
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setTopScores, setLastUpdate , fetchTopScoresAction , setLoading , setTotalCount } = statSlice.actions;
export default statSlice.reducer;
