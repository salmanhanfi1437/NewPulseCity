import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Language {
  code: string;
  name: string;
}

interface ChooseLanguageState {
  language: Language[];
  error: string | null;
}

const initialState: ChooseLanguageState = {
  language: [],
  error: null,
};

const chooseLanguageSlice = createSlice({
  name: 'chooseLanguages',
  initialState,
  reducers: {
    fetchLanguagesRequest: (state) => {},
    fetchLanguagesSuccess: (state, action: PayloadAction<Language[]>) => {
      state.language = action.payload;
      state.error = null;
    },
    fetchLanguagesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchLanguagesRequest,
  fetchLanguagesSuccess,
  fetchLanguagesFailure,
} = chooseLanguageSlice.actions;

export default chooseLanguageSlice.reducer;
