import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [
    {
      id: 'default-1',
      text: 'Welcome to your Todo App! Add your first task.',
      completed: false,
    }
  ],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.items.unshift(action.payload)
    },

    toggleTodo(state, action) {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },

    updateTodo(state, action) {
      const { id, text } = action.payload
      const todo = state.items.find((t) => t.id === id)
      if (todo) {
        todo.text = text
      }
    },

    removeTodo(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },

    clearCompleted(state) {
      state.items = state.items.filter((t) => !t.completed)
    },
  },
})

export const { addTodo, toggleTodo, updateTodo, removeTodo, clearCompleted } =
  todosSlice.actions

export default todosSlice.reducer

