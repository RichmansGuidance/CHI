import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserActions } from '../../api/userActions';
import { UserStatus } from '../../utils/UserStatus';
import { removeAuthToken, setAuthToken } from '../../api/axiosInstance';
import { UserStateI } from '../../Interfaces/UserStateI';

const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
};

const removeToken = () => {
    localStorage.removeItem('token');
    removeAuthToken();
};

export const initializeUser = createAsyncThunk(
    'user/initializeUser',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);

        if (!token) {
            return { token: null, isAuthenticated: false, user: null, status: UserStatus.LOGGED_OUT };
        }

        try {
            const userData = await UserActions.getMe();
            return {
                token,
                isAuthenticated: true,
                user: { id: userData.data.id, username: userData.data.username },
                status: UserStatus.LOGGED_IN
            };
        } catch (err: any) {
            removeToken();
            return rejectWithValue("Failed to fetch user info");
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await UserActions.login({ username, password });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState: UserStateI = {
    token: null,
    isAuthenticated: false,
    user: null,
    status: UserStatus.LOGGED_OUT
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            state.status = UserStatus.LOGGED_OUT;
            removeToken();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeUser.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
            .addCase(initializeUser.rejected, (state) => {
                state.status = UserStatus.LOGGED_OUT;
            })
            .addCase(login.pending, (state) => {
                state.status = UserStatus.LOGGING_IN;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ access_token: string; username: string; userId: number }>) => {
                const { access_token, username, userId } = action.payload;
                state.token = access_token;
                state.user = { id: userId, username };
                state.isAuthenticated = true;
                state.status = UserStatus.LOGGED_IN;
                saveToken(access_token);
            })
            .addCase(login.rejected, (state) => {
                state.status = UserStatus.LOGGED_OUT;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
