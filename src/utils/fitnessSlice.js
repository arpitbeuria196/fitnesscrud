import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    records: [] // Array to store fitness records
};
const fitnessSlice = createSlice({
        name: "fitness",
        initialState,

        reducers:{
            addFitnessData: (state,action) =>
            {
                state.records.push(action.payload)
            },
            updateFitnessData: (state,action) =>
            {
                const index = state.records.findIndex(record => record.id == action.payload.id);
                if (index !== -1)
                state.records[index] = action.payload;
            },
            removeFitnessData: (state, action) =>
            {
                state.records = state.records.filter(records => records.id!=action.payload.id)
            },
            setRecords: (state, action) => {
                // Load initial records (Read operation)
                state.records = action.payload;
            }
        }
})

export const{addFitnessData,updateFitnessData,removeFitnessData} = fitnessSlice.actions;
export default fitnessSlice.reducer;