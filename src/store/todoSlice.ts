import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: string;
}

interface TodoState {
  todos: Todo[];
}

// Load initial state from localStorage
const loadState = (): TodoState => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return { todos: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { todos: [] };
  }
};

const initialState: TodoState = loadState();

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; userId: string }>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        userId: action.payload.userId,
      });
      localStorage.setItem('todos', JSON.stringify(state));
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state));
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state));
    },
    updateTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        localStorage.setItem('todos', JSON.stringify(state));
      }
    },
    clearUserTodos: (state) => {
      state.todos = [];
      localStorage.setItem('todos', JSON.stringify(state));
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo, clearUserTodos } = todoSlice.actions;
export default todoSlice.reducer;