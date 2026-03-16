import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cartSlice.js'
import todosReducer from './reducers/todosSlice.js'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    todos: todosReducer,
  },
})

