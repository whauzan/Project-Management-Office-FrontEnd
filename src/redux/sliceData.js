import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    company_id: "",
    name: "",
    address: "",
    email: "",
    phoneNumber: ""
}

export const sliceData = createSlice({
    name: "data",
    initialState: {
        datas: initialValue
    },
    reducers: {
        saveData: (state, action) => {
            const newData = {...action.payload}
            state.datas = newData
        },
        deleteData: (state) => {
            state.datas = initialValue
        }
    }
})

export const { saveData, deleteData } = sliceData.actions;
export default sliceData.reducer;