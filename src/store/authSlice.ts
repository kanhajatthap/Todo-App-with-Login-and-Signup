import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
}

const DEFAULT_AVATAR = "https://single-page-website-bootstrap-template.vercel.app/assets/img/testimonials/testimonials-3.jpg";

// Load initial state from localStorage
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('auth');
    const serializedUsers = localStorage.getItem('users');
    if (serializedState === null) {
      return {
        isAuthenticated: false,
        user: null,
        users: serializedUsers ? JSON.parse(serializedUsers) : [],
      };
    }
    return {
      ...JSON.parse(serializedState),
      users: serializedUsers ? JSON.parse(serializedUsers) : [],
    };
  } catch (err) {
    return {
      isAuthenticated: false,
      user: null,
      users: [],
    };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<Omit<User, 'avatar'> & { avatar?: string }>) => {
      const newUser = {
        ...action.payload,
        avatar: action.payload.avatar || DEFAULT_AVATAR,
      };
      state.users.push(newUser);
      state.isAuthenticated = true;
      state.user = newUser;
      localStorage.setItem('users', JSON.stringify(state.users));
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: newUser }));
    },
    login: (state, action: PayloadAction<{ usernameOrEmail: string; password: string }>) => {
      const user = state.users.find(
        u => (u.username === action.payload.usernameOrEmail || u.email === action.payload.usernameOrEmail) 
        && u.password === action.payload.password
      );
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user }));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;