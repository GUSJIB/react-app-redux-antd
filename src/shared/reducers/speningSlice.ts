import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../config/store';

export const initialState = {
  loading: false,
};

export const SpeningSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    spening(state) {
      return {
        ...state,
        loading: true,
      };
    },
    stop(state) {
      return {
        ...state,
        loading: false,
      };
    },
  },
  extraReducers: {},
});

export const setSpening: () => AppThunk = () => dispatch => {
  dispatch(spening());
};
export const setStop: () => AppThunk = () => dispatch => {
  dispatch(stop());
};

export interface IWithSpeningInput {
  firstAction: any;
  secondAction?: any;
  thirdAction?: any;
}

export const withSpening: (input: IWithSpeningInput) => AppThunk = input => dispatch => {
  dispatch(setSpening());
  dispatch(input.firstAction)
    .then(() => {
      if (input.secondAction) {
        return dispatch(input.secondAction);
      }
      dispatch(setStop());
    })
    .then(() => {
      if (input.thirdAction) {
        return dispatch(input.thirdAction);
      }
    })
    .then(() => {
      dispatch(setStop());
    })
    .catch(() => {
      dispatch(setStop());
    });
};

export const selectLoading = state => state;

export const { spening, stop } = SpeningSlice.actions;
export default SpeningSlice.reducer;
