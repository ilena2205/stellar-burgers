import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '../utils/burger-api';
import { TUser } from '../utils/types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type UserState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isChecked: boolean;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isChecked: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ email, name, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isChecked = false;
        state.error = 'Ошибка';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.isChecked = true;
        state.error = 'Ошибка';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Ошибка';
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
        state.isChecked = false;
      });
  },
  selectors: {
    selectUserData: (state) => state,
    selectErrors: (state) => state.error,
    selectUser: (state) => state.user
  }
});

export const { authChecked } = userSlice.actions;
export const { selectUserData, selectErrors, selectUser } = userSlice.selectors;
export default userSlice.reducer;
