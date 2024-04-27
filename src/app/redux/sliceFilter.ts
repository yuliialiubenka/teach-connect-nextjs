// redux/sliceFilter.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  filterTeachers: string[];
  name: string;
  selectedLevels: string;
}

const initialState: FilterState = {
  filterTeachers: [],
  name: '',
  selectedLevels: ''
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string[]>) => {
      state.filterTeachers = action.payload;
    },
    deleteFilter: (state) => {
      state.filterTeachers = [];
      state.name = '';
    },
    addFilterName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSelectedLevels(state, action: PayloadAction<string>) {
      state.selectedLevels = action.payload;
  },
  },
});

export const { addFilter, deleteFilter, addFilterName, setSelectedLevels } = filterSlice.actions;
