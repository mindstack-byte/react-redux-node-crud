import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Base URL for the todos API
const API_BASE_URL = 'http://localhost:5001/api/todos'

// Async thunk to fetch all todos from the API
export const fetchTodos = createAsyncThunk('todos/fetchTodoswh', async () => {
  const response = await fetch(API_BASE_URL)
  if (!response.ok) throw new Error('Failed to fetch todos')
  return response.json()
})

// Async thunk to add a new todo
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (todo) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
  if (!response.ok) throw new Error('Failed to add todo')
  return response.json()
})

// Async thunk to update an existing todo
export const updateTodoAsync = createAsyncThunk('todos/updateTodoAsync', async ({ id, ...updates }) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!response.ok) throw new Error('Failed to update todo')
  return response.json()
})

// Async thunk to delete a todo
export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to delete todo')
  return id
})

// Initial state for the todos slice
const initialState = {
  items: [],      // Array of todo items
  loading: false, // Loading state for async operations
  error: null,    // Error message if any operation fails
}

// Create the todos slice with reducers and extraReducers
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Reducer to clear the error state
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Handle fetchTodos states
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Handle addTodoAsync success
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      // Handle updateTodoAsync success
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Handle deleteTodoAsync success
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload)
      })
  },
})

// Export the action creators
export const { clearError } = todosSlice.actions

// Export the reducer
export default todosSlice.reducer

