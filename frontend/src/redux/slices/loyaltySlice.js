import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getLoyaltyRequestHandler = createAsyncThunk('loyaltySlice/getLoyaltyRequestHandler', async function (axiosParameter) {
  console.log('getLoyaltyRequestHandler run');
  try {
    const response = await axios.get('/loyalty');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------

const createNewLoyaltyRequestHandler = createAsyncThunk('loyaltySlice/createNewLoyaltyRequestHandler', async function (axiosParameter) {
  console.log('createNewLoyaltyRequestHandler run');
  try {
    const response = await axios.post('/loyalty', axiosParameter);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// note again, under redux toolkit, "action" parameter is always pre-structured as {type, payload} object

const loyaltySlice = createSlice({
  name: 'loyaltySlice',
  initialState: {
    isLoyaltyListStateLoading: false,
    isProcessing: false,
    loyaltyListState: {},
    processingResult: {},
  },
  reducers: {
    resetProcessingResultHandler(state, action) {
      console.log('clean up run');
      state.processingResult = {};
    },
  },

  // extraReducers always goes hand in hand with "createAsyncThunk" above
  extraReducers: {
    [getLoyaltyRequestHandler.pending]: (state, action) => {
      state.isLoyaltyListStateLoading = true;
    },
    [getLoyaltyRequestHandler.fulfilled]: (state, action) => {
      // this "fulfilled" is ONLY triggered when try block is reached in createAsyncThunk's callback function | action.payload returns what is returned under "try block"
      state.isLoyaltyListStateLoading = false;
      state.loyaltyListState = { data: action.payload };
    },
    [getLoyaltyRequestHandler.rejected]: (state, action) => {
      // this "rejected" is ONLY triggered when error catch block is reached in createAsyncThunk's callback function | action.payload returns what is returned under "catch block"
      state.isLoyaltyListStateLoading = false;
      state.loyaltyListState = { error: action.payload };
    },

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    [createNewLoyaltyRequestHandler.pending]: (state, action) => {
      state.isProcessing = true;
    },
    [createNewLoyaltyRequestHandler.fulfilled]: (state, action) => {
      // this "fulfilled" is ONLY triggered when try block is reached in createAsyncThunk's callback function | action.payload returns what is returned under "try block"
      state.isProcessing = false;
      state.processingResult = { data: action.payload };
    },
    [createNewLoyaltyRequestHandler.rejected]: (state, action) => {
      // this "rejected" is ONLY triggered when error catch block is reached in createAsyncThunk's callback function | action.payload returns what is returned under "catch block"
      state.isProcessing = false;
      state.processingResult = { error: action.payload };
    },
  },
});

const loyaltySliceActions = loyaltySlice.actions;

export { loyaltySlice, getLoyaltyRequestHandler, createNewLoyaltyRequestHandler, loyaltySliceActions };
