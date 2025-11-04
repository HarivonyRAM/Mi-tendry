import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Music } from '../types';

const initialState: Music[] = []

const musicSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMusics: (_, action: PayloadAction<Music[]>) => {
            return action.payload
        },
    },
})

export const { setMusics } = musicSlice.actions
export default musicSlice.reducer
