import { createSlice } from "@reduxjs/toolkit";

const modeInicialState = {
    darkMode:true
}

const modeSlice = createSlice({
    name: 'mode',
    initialState: modeInicialState,
    reducers: {
        switchMode:{
            reducer(state){
                state.darkMode = !state.darkMode
            }
        }
    }
})

export default modeSlice.reducer;
export const selectedMode = (state) => state.mode.darkMode;
export const { switchMode } = modeSlice.actions