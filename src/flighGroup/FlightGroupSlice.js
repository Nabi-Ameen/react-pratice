import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {HTTP} from '../ApiConfig'

const initialState = {
    origanList: [],
    destinationList: [],
    flightGroup: [],
    editFLightData: null,
    isLoading: false,
    error: null,
}

// for originList
export const asyncGetOriganListData = createAsyncThunk(
    "asyncGetOriganListData/get",
    async(value, {rejectWithValue})=>{
        try{
            const response = await HTTP.get(`/api/v1/getAllAirPortCodes?q=${value}`)
            return await response?.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error)
        }
    }
)

// for distinationList
export const asyncGetDestinationListData = createAsyncThunk(
    "asyncGetDestinationListData/get",
    async(value, {rejectWithValue})=>{
        try{
            const response = await HTTP.get(`/api/v1/getAllAirPortCodes?q=${value}`)
            return await response?.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error)
        }
    }
)

//get flightgroup data
export const asyncGetFlightGroupData = createAsyncThunk(
    "asyncGetFlightGroupData/get",
    async(_, {rejectWithValue})=>{
        try {
            const response = await HTTP.get('/api/v1/b2b/flight_groups')
            return await response?.data?.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error)
        }
    }
)

//post flightgroup data
export const asyncPostFlightGroupData = createAsyncThunk(
    "asyncPostFlightGroupData/post",
    async(obj, {rejectWithValue, dispatch})=>{
        // console.log(obj);
        try {
            const response = await HTTP.post('/api/v1/b2b/flight_groups/group_promotion', obj)
            dispatch(asyncGetFlightGroupData())
            // return await response?.data?.data
        } catch (error) {
            console.log(error)
            rejectWithValue(error)
        }
    }
)

//Edit FlightGroup data
export const asyncEditFlightGroupData = createAsyncThunk(
    "asyncEditFlightGroupData/edit",
    async({id}, {rejectWithValue})=>{
        console.log(id)
        try {
            const response = await HTTP.get(`/api/v1/b2b/flight_groups/group_promotion_edit/${id}`)
            console.log(await response?.data?.data?.edit)
            return await response?.data?.data?.edit
        } catch (error) {
            console.log(error)
            rejectWithValue(error)
        }
    }
)

//deleting flightgroup data
export const asyncDeleteFlightGroupData = createAsyncThunk(
    "asyncDeleteFlightGroupData/delete",
    async({id}, {rejectWithValue, dispatch})=>{
        try {
            const response = await HTTP.get(`/api/v1/b2b/flight_groups/group_promotion_destory/${id}`)
            dispatch(asyncGetFlightGroupData())
        } catch (error) {
            console.log(error)
            rejectWithValue(error)
        }
    }
)

export const FlightGroup = createSlice({
    name: "flightGroup",
    initialState,
    reducers:{
        makeOriginNull:(state)=>{
            state.origanList=[]
        }
    },
    extraReducers: (builder)=>{

        // getting origanlist data
        builder.addCase(asyncGetOriganListData.pending, (state, {payload})=>{
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(asyncGetOriganListData.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.error = null;
            state.origanList = payload
        })
        builder.addCase(asyncGetOriganListData.rejected, (state, {payload})=>{
            state.isLoading = false;
            state.error = payload
        })

        // getting destinationList data
        builder.addCase(asyncGetDestinationListData.pending, (state, {payload})=>{
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(asyncGetDestinationListData.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.error = null;
            state.destinationList = payload
        })
        builder.addCase(asyncGetDestinationListData.rejected, (state, {payload})=>{
            state.isLoading = false;
            state.error = payload
        })

        //getting FlightGroup data
        builder.addCase(asyncGetFlightGroupData.pending, (state, {payload})=>{
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(asyncGetFlightGroupData.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.error = null;
            state.flightGroup = payload
        })
        builder.addCase(asyncGetFlightGroupData.rejected, (state, {payload})=>{
            state.isLoading = false;
            state.error = payload;
        })

        //posting FLightGroup data
        builder.addCase(asyncPostFlightGroupData.pending, (state, {payload})=>{
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(asyncPostFlightGroupData.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.error = null;
            state.flightGroup = payload
        })
        builder.addCase(asyncPostFlightGroupData.rejected, (state, {payload})=>{
            state.isLoading = false;
            state.error = payload;
        })

        //deleting FLightGroup data
        builder.addCase(asyncDeleteFlightGroupData.pending, (state, {payload})=>{
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(asyncDeleteFlightGroupData.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.error = null;
            const flightGroupData = state.flightGroup.filter((data)=> data.id !== payload)
            state.flightGroup = flightGroupData;
            
        })
        builder.addCase(asyncDeleteFlightGroupData.rejected, (state, {payload})=>{
            state.isLoading = false;
            state.error = null;
        })
        
        //edit FLightGroup data
        builder.addCase(asyncEditFlightGroupData.pending, (state, {payload})=>{
            state.isLoading = true;
            state.error = null
        })
        builder.addCase(asyncEditFlightGroupData.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.error = null
            state.editFLightData = payload
        })
        builder.addCase(asyncEditFlightGroupData.rejected, (state, {payload})=>{
            state.isLoading = false;
            state.error = payload
        })
    }
})

export const {makeOriginNull} =FlightGroup.actions

export default FlightGroup.reducer;