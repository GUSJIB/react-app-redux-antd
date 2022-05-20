import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from './reducer.utils';
import Cookies from 'universal-cookie';

import { AppThunk } from '../../config/store';

export const initialState = {
  loading: false,
  isAuthenticated: true,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  account: {} as any,
  errorMessage: null as unknown as string, // Errors returned from server side
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  logoutUrl: null as unknown as string,
};

export type AuthenticationState = Readonly<typeof initialState>;
export type TokenType = 'access-token' | 'refresh-token';
// Actions

export const getSession = (): AppThunk => async (dispatch, getState) => {
  await dispatch(getAccount());
};

export const getAccount = createAsyncThunk('authentication/get_account', async () => axios.get<any>('/account'), {
  serializeError: serializeAxiosError,
});

export const getToken = () => {
  const typePrefix = 'authentication/login';
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const payload = async (code: string) => {
    const data = new URLSearchParams();
    data.append('code', code);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', `${window.location.origin}/login-success`);
    return axios.post<any>('/oauth/token', data, config);
  };
  return createAsyncThunk(typePrefix, payload, { serializeError: serializeAxiosError });
};

export const login: (code: string) => AppThunk = code => async dispatch => {
  const gt = getToken();
  const result = await dispatch(gt(code));
  const { data } = result.payload as AxiosResponse;
  if (data) {
    const d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 1000);
    const cookies = new Cookies();
    cookies.set('access_token', data.access_token, { path: '/', expires: d });
    cookies.set('refresh_token', data.refresh_token, { path: '/', expires: d });
  }
  dispatch(getSession());
};

export const clearAuthToken = () => {
  const cookies = new Cookies();
  cookies.remove('access_token', { path: '/' });
  cookies.remove('refresh_token', { path: '/' });
};

export const logout: () => AppThunk = () => dispatch => {
  clearAuthToken();
  dispatch(logoutSession());
};

export const clearAuthentication = messageKey => dispatch => {
  clearAuthToken();
  dispatch(authError(messageKey));
  dispatch(clearAuth());
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
      };
    },
    authError(state, action) {
      return {
        ...state,
        redirectMessage: action.payload,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    },
    authWithStoredToken(state) {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getToken().rejected, (state, action) => ({
        ...initialState,
        // errorMessage: action.error.message,
        loginError: true,
        isAuthenticated: false,
      }))
      .addCase(getToken().fulfilled, (state, action) => ({
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
        isAuthenticated: true,
      }))
      .addCase(getToken().pending, state => {
        state.loading = true;
      })
      .addCase(getAccount.rejected, (state, action) => ({
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        // errorMessage: action.error.message,
      }))
      .addCase(getAccount.fulfilled, (state, action) => {
        const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
        return {
          ...state,
          isAuthenticated,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data,
        };
      })
      .addCase(getAccount.pending, state => {
        state.loading = true;
      });
  },
});

export const { logoutSession, authError, clearAuth, authWithStoredToken } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
