import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Stat {
  id: number;
  playerId: number;
  nickname: string;
  profileImage: string;
  createdAt: Date;
  score: number;
}

interface ToastState {
  type: 'success' | 'error' | null;
  text: string;
  show: boolean;
}

export interface StatState {
  topScores: Stat[];
  totalCount: number;
  lastUpdate: string | null;
  isLoading: boolean;
  toast: ToastState;
  repeatedIds: string[];
}

const initialState: StatState = {
  topScores: [],
  totalCount: 0,
  lastUpdate: null,
  isLoading: false,
  toast: {
    type: null,
    text: '',
    show: false
  },
  repeatedIds: [],
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
    setToast(state, action: PayloadAction<ToastState>) {
      state.toast = action.payload;
    },
    resetToast(state) {
      state.toast = initialState.toast;
    },
    setRepeatedIds(state, action: PayloadAction<number[]>) {
      state.repeatedIds = action.payload;
    },
  },
});

export const { setTopScores, setLastUpdate , fetchTopScoresAction , setLoading , setTotalCount , setToast , resetToast , setRepeatedIds } = statSlice.actions;
export default statSlice.reducer;
