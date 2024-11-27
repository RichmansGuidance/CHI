'use client';

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserStateI } from '@/Interfaces/UserStateI';
import { UsersActions } from '../../api/usersActions';
import { UserStatus } from '../../utils/UserStatus';
import { removeAuthToken, setAuthToken } from '../../api/axiosInstance';

// Сервіс замість окремих функцій 
const TokenService = {
    save(token: string) {
        localStorage.setItem('token', token);
        setAuthToken(token);
    },
    remove() {
        localStorage.removeItem('token');
        removeAuthToken();
    },
    load(): string | null {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);
        return token;
    },
};

const initializeUser = async (): Promise<UserStateI> => {
    const token = TokenService.load();

    if (token) {
        try {
            const userData = await UsersActions.getMe();
            return {
                token,
                isAuthenticated: true,
                user: {
                    id: userData.data.id,
                    username: userData.data.username,
                },
                status: UserStatus.LOGGED_IN,
            };
        } catch (err: any) {
            TokenService.remove();
            console.error("Failed to initialize user:", err.message);
        }
    }

    return {
        token: null,
        isAuthenticated: false,
        user: null,
        status: UserStatus.LOGGED_OUT,
    };
};

const initialState: UserStateI = await initializeUser();

export const login = createAsyncThunk(
    'user/login',
    async (
        { username, password }: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await UsersActions.login({ username, password });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            state.status = UserStatus.LOGGED_OUT;
            TokenService.remove();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = UserStatus.LOGGING_IN;
            })
            .addCase(
                login.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        access_token: string;
                        username: string;
                        userId: number;
                    }>
                ) => {
                    const { access_token, username, userId } = action.payload;
                    state.token = access_token;
                    state.user = { id: userId, username };
                    state.isAuthenticated = true;
                    state.status = UserStatus.LOGGED_IN;
                    TokenService.save(access_token);
                }
            )
            .addCase(login.rejected, (state) => {
                state.status = UserStatus.LOGGED_OUT;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
