import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface queryStatus {
    status: string | undefined
    isFecthing: boolean

}

const initialState: queryStatus = {
    isFecthing: false,
    status: undefined
}


export const queryStatusSlice = createSlice({
    name: 'queryStatus',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        fetchStatus: (state) => {
            state.status = "fetching"
            state.isFecthing = true
        },
        releaseStatus: (state) => {
            state.status = undefined
            state.isFecthing = false
        }
    },
})

export const { setStatus, fetchStatus, releaseStatus } = queryStatusSlice.actions

export default queryStatusSlice.reducer